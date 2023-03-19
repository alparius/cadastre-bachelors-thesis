package controller

import (
	"encoding/json"
	"kataszter-backend/assembler"
	"kataszter-backend/dto"
	"kataszter-backend/model"
	"kataszter-backend/shared/stringFunctions"
	"kataszter-backend/shared/uploader"
	"kataszter-backend/store"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kennygrant/sanitize"
	"github.com/sirupsen/logrus"
	"github.com/thoas/go-funk"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PriestController struct {
	Store       store.PriestStore
	ParishStore store.ParishStore
}

// FindPriestByID returns one Priest with given ID.
func (ctrl *PriestController) FindPriestByID(context *gin.Context) {
	id := context.Param("id")
	priest, err := ctrl.Store.FindByID(id)
	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	priestDto := assembler.PriestToPriestProfileDtoAssembler(*priest)
	logrus.WithField("ID", id).Info("returning priest")
	context.JSON(http.StatusOK, priestDto)
}

// FindAllPriestsByFilter returns all Priests matching certain search criteria.
func (ctrl *PriestController) FindAllPriestsByFilter(context *gin.Context) {
	filters := buildFilter(context)
	logrus.WithField("filters", filters).Info("got filter with fields")

	priests, err := ctrl.Store.FindAllByFilter(filters)
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("returning with error")
		return
	}

	if len(*priests) == 0 {
		context.AbortWithStatus(http.StatusNoContent)
		logrus.Info("returning without results")
		return
	}

	if context.DefaultQuery("chart", "") == "yes" {
		returnPriests := assembler.PriestsToPriestChartDtosAssembler(priests)
		logrus.WithField("length", len(returnPriests)).Info("returning ChartPriestDtos")
		context.JSON(http.StatusOK, returnPriests)
	} else {
		returnPriests := assembler.PriestsToMinPriestDtosAssembler(priests)
		logrus.WithField("length", len(returnPriests)).Info("returning MinPriestDtos")
		context.JSON(http.StatusOK, returnPriests)
	}

}

// CreatePriest adds a new Priest.
func (ctrl *PriestController) CreatePriest(context *gin.Context) {
	var newPriest model.Priest

	decoder := json.NewDecoder(context.Request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&newPriest)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	// check whether Priest is already present in the collection
	// a Priest is considered duplicate when the name, birthTown and birtYear match
	filters := make(map[string]string)
	filters["name"] = newPriest.Name
	filters["birthTown"] = newPriest.BirthTown
	if newPriest.BirthDate.Year > 0 {
		filters["birthStart"] = strconv.Itoa(newPriest.BirthDate.Year)
		filters["birthEnd"] = strconv.Itoa(newPriest.BirthDate.Year)
	}

	priests, err := ctrl.Store.FindAllByFilter(filters)
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("returning with error")
		return
	}
	if len(*priests) > 0 { // Priest already present in the collection
		minPriestsDto := assembler.PriestsToMinPriestDtosAssembler(priests)
		logrus.WithField("ID", (*priests)[0].ID).Info("returning existing priest ID")
		context.JSON(http.StatusOK, gin.H{"label": "info.duplicateFound", "insertedID": minPriestsDto[0].ID, "data": minPriestsDto[0]})
		return
	}

	// Priest NOT present in the collection
	logrus.WithField("Name", newPriest.Name).
		WithField("BirthDate", newPriest.BirthDate).Info("priest not found")

	insertedID, err := ctrl.Store.Insert(&newPriest)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	logrus.WithField("priest", newPriest.ID).Info("new priest created")
	context.JSON(http.StatusOK, gin.H{"label": "info.priestCreated", "insertedID": insertedID})
}

// UpdatePriest updates a Priest.
func (ctrl *PriestController) UpdatePriest(context *gin.Context) {
	var dto dto.PriestProfileDto

	decoder := json.NewDecoder(context.Request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&dto)
	if err != nil {
		context.AbortWithStatus(http.StatusBadRequest)
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	logrus.WithField("ID:", dto.ID).Info("updating priest")

	oldPriest, err := ctrl.Store.FindByID(dto.ID.Hex())
	if err != nil {
		context.AbortWithStatus(http.StatusNotFound)
		logrus.WithField("error", err.Error()).Error("entity not found")
		return
	}

	newPriest := assembler.PriestProfileUpdateAssembler((*oldPriest), dto)

	// update parishes with new placements
	for index, item := range newPriest.AssistantPriestPlaces {
		if item.ID.IsZero() {
			// new placement added in this very update, to be inserted
			newPriest.AssistantPriestPlaces[index].ID = primitive.NewObjectID()
			err = ctrl.ParishStore.InsertPlacement(item.PlaceID.Hex(), assembler.AssistantPriestPlaceToParishPlacementAssembler(&item, newPriest), "assistantPriests")
			if err != nil {
				context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
				logrus.WithField("error", err.Error()).Error("database error")
				return
			}

		} else {
			// existing placement
			for _, oldItem := range oldPriest.AssistantPriestPlaces {
				// finding the matching old placement
				if oldItem.ID == item.ID {
					if oldItem.PlaceID != item.PlaceID || oldItem.Place != item.Place {
						// if the place changed, delete from the old and insert into the new
						err = ctrl.ParishStore.DeletePlacement(oldItem.PlaceID.Hex(), assembler.AssistantPriestPlaceToParishPlacementAssembler(&oldItem, newPriest), "assistantPriests")
						if err != nil {
							context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
							logrus.WithField("error", err.Error()).Error("database error")
							return
						}
						err = ctrl.ParishStore.InsertPlacement(item.PlaceID.Hex(), assembler.AssistantPriestPlaceToParishPlacementAssembler(&item, newPriest), "assistantPriests")
						if err != nil {
							context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
							logrus.WithField("error", err.Error()).Error("database error")
							return
						}
					} else if oldItem.StartDate != item.StartDate || oldItem.EndDate != item.EndDate {
						// if only the dates changed, delete and reinsert the new
						err = ctrl.ParishStore.DeletePlacement(item.PlaceID.Hex(), assembler.AssistantPriestPlaceToParishPlacementAssembler(&item, newPriest), "assistantPriests")
						if err != nil {
							context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
							logrus.WithField("error", err.Error()).Error("database error")
							return
						}
						err = ctrl.ParishStore.InsertPlacement(item.PlaceID.Hex(), assembler.AssistantPriestPlaceToParishPlacementAssembler(&item, newPriest), "assistantPriests")
						if err != nil {
							context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
							logrus.WithField("error", err.Error()).Error("database error")
							return
						}
					}
				}
			}
		}
	}

	// update parishes with new placements
	for index, item := range newPriest.MainPriestPlaces {
		if item.ID.IsZero() {
			// new placement added in this very update, to be inserted
			newPriest.MainPriestPlaces[index].ID = primitive.NewObjectID()
			err = ctrl.ParishStore.InsertPlacement(item.PlaceID.Hex(), assembler.MainPriestPlaceToParishPlacementAssembler(&item, newPriest), "mainPriests")
			if err != nil {
				context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
				logrus.WithField("error", err.Error()).Error("database error")
				return
			}
		} else {
			// existing placement
			for _, oldItem := range oldPriest.MainPriestPlaces {
				// finding the matching old placement
				if oldItem.ID == item.ID {
					if oldItem.PlaceID != item.PlaceID || oldItem.Place != item.Place {
						// if the place changed, delete from the old and insert into the new
						err = ctrl.ParishStore.DeletePlacement(oldItem.PlaceID.Hex(), assembler.MainPriestPlaceToParishPlacementAssembler(&oldItem, newPriest), "mainPriests")
						if err != nil {
							context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
							logrus.WithField("error", err.Error()).Error("database error")
							return
						}
						err = ctrl.ParishStore.InsertPlacement(item.PlaceID.Hex(), assembler.MainPriestPlaceToParishPlacementAssembler(&item, newPriest), "mainPriests")
						if err != nil {
							context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
							logrus.WithField("error", err.Error()).Error("database error")
							return
						}
					} else if oldItem.StartDate != item.StartDate || oldItem.EndDate != item.EndDate || oldItem.NumberOfPeople != item.NumberOfPeople {
						// if only the data changed, delete and reinsert the new
						err = ctrl.ParishStore.DeletePlacement(item.PlaceID.Hex(), assembler.MainPriestPlaceToParishPlacementAssembler(&item, newPriest), "mainPriests")
						if err != nil {
							context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
							logrus.WithField("error", err.Error()).Error("database error")
							return
						}
						err = ctrl.ParishStore.InsertPlacement(item.PlaceID.Hex(), assembler.MainPriestPlaceToParishPlacementAssembler(&item, newPriest), "mainPriests")
						if err != nil {
							context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
							logrus.WithField("error", err.Error()).Error("database error")
							return
						}
					}
				}
			}
		}
	}

	// deleting placements only present in the old priest record
	for _, item := range oldPriest.AssistantPriestPlaces {
		deleted := true
		for _, newItem := range newPriest.AssistantPriestPlaces {
			if item.ID == newItem.ID {
				deleted = false
			}
		}
		if deleted {
			err = ctrl.ParishStore.DeletePlacement(item.PlaceID.Hex(), assembler.AssistantPriestPlaceToParishPlacementAssembler(&item, newPriest), "assistantPriests")
			if err != nil {
				context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
				logrus.WithField("error", err.Error()).Error("database error")
				return
			}
		}
	}

	// deleting placements only present in the old priest record
	for _, item := range oldPriest.MainPriestPlaces {
		deleted := true
		for _, newItem := range newPriest.MainPriestPlaces {
			if item.ID == newItem.ID {
				deleted = false
			}
		}
		if deleted {
			err = ctrl.ParishStore.DeletePlacement(item.PlaceID.Hex(), assembler.MainPriestPlaceToParishPlacementAssembler(&item, newPriest), "mainPriests")
			if err != nil {
				context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
				logrus.WithField("error", err.Error()).Error("database error")
				return
			}
		}
	}

	err = ctrl.Store.Update(&newPriest)
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	logrus.WithField("ID:", dto.ID).Info("updating was successful")
	context.JSON(http.StatusOK, nil)
}

// DeletePriest deletes a Priest.
func (ctrl *PriestController) DeletePriest(context *gin.Context) {
	id := context.Param("id")

	_, err := ctrl.Store.FindByID(id)
	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"label": "error.server"})
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	err = ctrl.Store.Delete(id)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	err = ctrl.ParishStore.DeletePriestReferences(id)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	logrus.WithField("ID:", id).Info("deletion was successful")
	context.JSON(http.StatusOK, gin.H{"label": "info.deleteSuccessful"})
}

// buildFilter builds a map from the API call's queryString parameters
func buildFilter(context *gin.Context) map[string]string {
	filters := make(map[string]string)

	getStringFilter(context, "name", &filters)
	getStringFilter(context, "birthTown", &filters)
	getStringFilter(context, "placement", &filters)
	getStringFilter(context, "area", &filters)

	filterEndYear := strconv.Itoa(time.Now().Year())
	getNumberFilter(context, "activeStart", &filters, filterStartYear)
	getNumberFilter(context, "activeEnd", &filters, filterEndYear)
	getNumberFilter(context, "birthStart", &filters, filterStartYear)
	getNumberFilter(context, "birthEnd", &filters, filterEndYear)
	getNumberFilter(context, "deathStart", &filters, filterStartYear)
	getNumberFilter(context, "deathEnd", &filters, filterEndYear)
	getNumberFilter(context, "subscriptionStart", &filters, filterStartYear)
	getNumberFilter(context, "subscriptionEnd", &filters, filterEndYear)
	getNumberFilter(context, "graduationStart", &filters, filterStartYear)
	getNumberFilter(context, "graduationEnd", &filters, filterEndYear)

	return filters
}

// getStringFilter checks for a valid query param
func getStringFilter(context *gin.Context, paramName string, filters *map[string]string) {
	value := context.DefaultQuery(paramName, "")
	if len(value) > 0 {
		(*filters)[paramName] = value
	}
}

const filterStartYear = "1800"

// getNumberFilter checks and adds a query param if it is a valid numeric filter
func getNumberFilter(context *gin.Context, paramName string, filters *map[string]string, tabu string) {
	numberString := context.DefaultQuery(paramName, "")
	if len(numberString) > 0 && numberString != tabu {
		if _, err := strconv.Atoi(numberString); err == nil {
			(*filters)[paramName] = numberString
		}
	}
}

// Upload file
func (ctrl *PriestController) UploadFile(context *gin.Context) {
	id := context.Param("id") // priest if from parameters
	priest, err := ctrl.Store.FindByID(id)
	var filenames []string

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	form, err := context.MultipartForm()
	files := form.File["files[]"] // list of the files

	if err != nil {
		context.AbortWithStatus(http.StatusBadRequest)
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	for _, file := range files { // goes through the files

		filename := filepath.Base(file.Filename)
		ext := filepath.Ext(filename)

		if _, ok := uploader.FileExtensions[ext]; ok {
			var name = sanitize.Name(filename)
			filename = strconv.Itoa(len(priest.Files)+len(filenames)) + "-" + strings.TrimSuffix(name, filepath.Ext(name)) + "-" + id + "-f" + filepath.Ext(name)
			filePath, err := filepath.Abs("./uploaded/" + filename) // file save path

			if err != nil {
				logrus.WithField("error", err.Error()).Error("file path/name error")
				context.AbortWithStatus(http.StatusInternalServerError)
				uploader.Rollback(filenames)
				logrus.Error("file saving problem")
				return
			}

			if err := context.SaveUploadedFile(file, filePath); err != nil { // save to the file
				logrus.WithField("error", err.Error()).Error("file saving problem")
				context.AbortWithStatus(http.StatusInternalServerError)
				uploader.Rollback(filenames)
				logrus.Error("file saving problem")
				return
			}

			filenames = append(filenames, filename)

			logrus.WithField("ID:", id).Info("file uploaded")
		} else {
			logrus.WithField("ID:", id).Info("file declined")
			context.AbortWithStatus(http.StatusBadRequest)
			uploader.Rollback(filenames)
			logrus.Error("file saving problem")
			return
		}
	}

	priest.Files = append(priest.Files, filenames...)

	err = ctrl.Store.Update(priest)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database error")
		context.AbortWithStatus(http.StatusInternalServerError)
		uploader.Rollback(filenames)
		logrus.Error("file saving problem")
		return
	}

	context.JSON(http.StatusOK, assembler.PriestToPriestProfileDtoAssembler(*priest))
}

// Upload picture
func (ctrl *PriestController) UploadPicture(context *gin.Context) {
	id := context.Param("id") // priest if from parameters
	priest, err := ctrl.Store.FindByID(id)
	var filenames []string

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	form, err := context.MultipartForm()
	files := form.File["pictures[]"] // list of the files

	if err != nil {
		context.AbortWithStatus(http.StatusBadRequest)
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	for _, file := range files { // goes through the files

		filename := filepath.Base(file.Filename)
		ext := filepath.Ext(filename)

		if _, ok := uploader.PictureExtensions[ext]; ok {
			var name = sanitize.Name(filename)
			filename = strconv.Itoa(len(priest.Pictures)+len(filenames)) + "-" + strings.TrimSuffix(name, filepath.Ext(name)) + "-" + id + "-p" + filepath.Ext(name)
			filePath, err := filepath.Abs("./uploaded/" + filename) // file save path

			if err != nil {
				logrus.WithField("error", err.Error()).Error("file path/name error")
				context.AbortWithStatus(http.StatusInternalServerError)
				uploader.Rollback(filenames)
				logrus.Error("file saving problem")
				return
			}

			if err := context.SaveUploadedFile(file, filePath); err != nil { // save to the file
				logrus.WithField("error", err.Error()).Error("decode entity error")
				context.AbortWithStatus(http.StatusInternalServerError)
				uploader.Rollback(filenames)
				logrus.Error("file saving problem")
				return
			}

			filenames = append(filenames, filename)

			logrus.WithField("ID:", id).Info("picture uploaded")
		} else {
			logrus.WithField("ID:", id).Info("picture declined")
			context.AbortWithStatus(http.StatusBadRequest)
			uploader.Rollback(filenames)
			logrus.Error("file saving problem")
			return
		}
	}

	priest.Pictures = append(priest.Pictures, filenames...)

	err = ctrl.Store.Update(priest)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database error")
		context.AbortWithStatus(http.StatusInternalServerError)
		uploader.Rollback(filenames)
		logrus.Error("file saving problem")
		return
	}

	context.JSON(http.StatusOK, assembler.PriestToPriestProfileDtoAssembler(*priest))
}

// Return picture
func (ctrl *PriestController) GetPicture(context *gin.Context) {
	id := context.Param("id") // priest if from parameters
	priest, err := ctrl.Store.FindByID(id)

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	pictureName := context.Param("pictureName")

	if funk.Contains(priest.Pictures, pictureName) {
		context.File("./uploaded/" + pictureName)
	} else {
		context.AbortWithStatus(http.StatusBadRequest)
		logrus.Error("decode entity error: picture doesn't exist")
		return
	}
}

// Return file
func (ctrl *PriestController) GetFile(context *gin.Context) {
	id := context.Param("id") // priest if from parameters

	priest, err := ctrl.Store.FindByID(id)

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	fileName := context.Param("fileName")

	if funk.Contains(priest.Files, fileName) {
		context.Header("Content-Transfer-Encoding", "binary")
		context.Header("Content-Disposition", "attachment; filename="+fileName)
		context.Header("Content-Type", "application/octet-stream")
		context.File("./uploaded/" + fileName)
	} else {
		context.AbortWithStatus(http.StatusBadRequest)
		logrus.Error("decode entity error: picture doesn't exist")
		return
	}
}

func (ctrl *PriestController) DeleteFile(context *gin.Context) {
	id := context.Param("id")
	priest, err := ctrl.Store.FindByID(id)

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	fileName := context.Param("fileName")

	fileName = sanitize.Name(fileName)

	newFiles := stringFunctions.RemoveString(priest.Files, fileName)

	if newFiles == nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.Error("delete error")
		return
	}

	filePath, _ := filepath.Abs("./uploaded/" + fileName)
	err = os.Remove(filePath)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("delete error")
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.Error("file saving problem")
		return
	}

	priest.Files = newFiles

	err = ctrl.Store.Update(priest)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database error")
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.Error("file saving problem")
		return
	}
}

func (ctrl *PriestController) DeletePicture(context *gin.Context) {
	id := context.Param("id")
	priest, err := ctrl.Store.FindByID(id)

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	fileName := context.Param("fileName")

	fileName = sanitize.Name(fileName)

	newPictures := stringFunctions.RemoveString(priest.Pictures, fileName)

	if newPictures == nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.Error("delete error")
		return
	}

	filePath, _ := filepath.Abs("./uploaded/" + fileName)
	err = os.Remove(filePath)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("delete error")
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.Error("file saving problem")
		return
	}

	priest.Pictures = newPictures

	err = ctrl.Store.Update(priest)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database error")
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.Error("file saving problem")
		return
	}
}
