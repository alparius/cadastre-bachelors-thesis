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

	"github.com/kennygrant/sanitize"
	"github.com/thoas/go-funk"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type ParishController struct {
	Store       store.ParishStore
	PriestStore store.PriestStore
}

// FindParishByID return one Parish with given ID.
func (ctrl *ParishController) FindParishByID(context *gin.Context) {
	id := context.Param("id")
	parish, err := ctrl.Store.FindByID(id)
	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("parishID", id).Error("parish not found")
		return
	}

	logrus.WithField("ID", id).Info("returning parish")
	context.JSON(http.StatusOK, parish)
}

// FindAllParishesByFilter returns all parishes matching certain search criteria.
func (ctrl *ParishController) FindAllParishesByFilter(context *gin.Context) {
	filters := make(map[string]string)

	name := context.DefaultQuery("parishName", "")
	city := context.DefaultQuery("cityName", "")
	if len(name) > 0 {
		filters["name"] = name
	}

	if len(city) > 0 {
		filters["cityName"] = city
	}

	parishes, err := ctrl.Store.FindAllByFilter(filters)
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("returning with error")
		return
	}

	if len(*parishes) == 0 {
		context.AbortWithStatus(http.StatusNoContent)
		logrus.Info("returning without results")
		return
	}

	parishDtos := assembler.ParishesToParishDtosAssembler(parishes)

	minSizeString := context.DefaultQuery("minSize", "")
	minSize, err := strconv.Atoi(minSizeString)
	if err == nil {
		var limit int
		for _, p := range parishDtos {
			if p.NumberOfPriests < minSize {
				continue
			}
			parishDtos[limit] = p
			limit++
		}
		parishDtos = parishDtos[:limit]
	}

	logrus.WithField("length", len(parishDtos)).Info("returning ParishDtos")
	context.JSON(http.StatusOK, parishDtos)
}

// Upload file
func (ctrl *ParishController) UploadFile(context *gin.Context) {
	id := context.Param("id") // parish if from parameters
	parish, err := ctrl.Store.FindByID(id)
	var filenames []string

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("parishID", id).Error("parish not found")
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
			filename = strconv.Itoa(len(parish.Files)+len(filenames)) + "-" + strings.TrimSuffix(name, filepath.Ext(name)) + "-" + id + "-f" + filepath.Ext(name)
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
				logrus.Error("filesaving problem")
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

	parish.Files = append(parish.Files, filenames...)

	err = ctrl.Store.Update(parish)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database error")
		context.AbortWithStatus(http.StatusInternalServerError)
		uploader.Rollback(filenames)
		logrus.Error("file saving problem")
		return
	}

	context.JSON(http.StatusOK, parish)
}

// Upload picture
func (ctrl *ParishController) UploadPicture(context *gin.Context) {
	id := context.Param("id") // priest if from parameters
	parish, err := ctrl.Store.FindByID(id)
	var filenames []string

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("parishID", id).Error("parish not found")
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
			filename = strconv.Itoa(len(parish.Pictures)+len(filenames)) + "-" + strings.TrimSuffix(name, filepath.Ext(name)) + "-" + id + "-p" + filepath.Ext(name)
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

	parish.Pictures = append(parish.Pictures, filenames...)

	err = ctrl.Store.Update(parish)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database error")
		context.AbortWithStatus(http.StatusInternalServerError)
		uploader.Rollback(filenames)
		logrus.Error("file saving problem")
		return
	}

	context.JSON(http.StatusOK, parish)
}

// Return picture
func (ctrl *ParishController) GetPicture(context *gin.Context) {
	id := context.Param("id") // priest if from parameters
	parish, err := ctrl.Store.FindByID(id)

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	pictureName := context.Param("pictureName")

	if funk.Contains(parish.Pictures, pictureName) {
		context.File("./uploaded/" + pictureName)
	} else {
		context.AbortWithStatus(http.StatusBadRequest)
		logrus.Error("decode entity error: picture doesn't exist")
		return
	}
}

// Return file
func (ctrl *ParishController) GetFile(context *gin.Context) {
	id := context.Param("id") // priest if from parameters
	parish, err := ctrl.Store.FindByID(id)

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	fileName := context.Param("fileName")

	if funk.Contains(parish.Files, fileName) {
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

func (ctrl *ParishController) DeleteFile(context *gin.Context) {
	id := context.Param("id")
	parish, err := ctrl.Store.FindByID(id)

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	fileName := context.Param("fileName")

	fileName = sanitize.Name(fileName)

	filePath, _ := filepath.Abs("./uploaded/" + fileName)

	newFiles := stringFunctions.RemoveString(parish.Files, fileName)

	if newFiles == nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.Error("delete error")
		return
	}

	err = os.Remove(filePath)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("delete error")
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.Error("file saving problem")
		return
	}

	parish.Files = newFiles

	err = ctrl.Store.Update(parish)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database error")
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.Error("file saving problem")
		return
	}
}

func (ctrl *ParishController) DeletePicture(context *gin.Context) {
	id := context.Param("id")
	parish, err := ctrl.Store.FindByID(id)

	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("priestID", id).Error("priest not found")
		return
	}

	fileName := context.Param("fileName")

	fileName = sanitize.Name(fileName)

	newPictures := stringFunctions.RemoveString(parish.Pictures, fileName)

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

	parish.Pictures = newPictures

	err = ctrl.Store.Update(parish)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database error")
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.Error("file saving problem")
		return
	}
}

// CreateParish adds a new Parish.
func (ctrl *ParishController) CreateParish(context *gin.Context) {
	var newParish model.Parish
	decoder := json.NewDecoder(context.Request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&newParish)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	// check whether Parish is already present in the collection
	// a Parish is considered duplicate when the name matches (not checking location since legacy data doesn't have it)
	filters := make(map[string]string)
	filters["name"] = newParish.Name

	parishes, err := ctrl.Store.FindAllByFilter(filters)
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("returning with error")
		return
	}
	if len(*parishes) > 0 { // Parish already present in the collection
		parishesDtos := assembler.ParishesToParishDtosAssembler(parishes)
		logrus.WithField("ID", (*parishes)[0].ID).Info("returning existing parish ID")
		context.JSON(http.StatusOK, gin.H{"label": "info.duplicateFound", "insertedID": parishesDtos[0].ID, "data": parishesDtos[0]})
		return
	}

	// Parish NOT present in the collection
	logrus.WithField("Name", newParish.Name).Info("parish not found")

	insertedID, err := ctrl.Store.Insert(&newParish)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	logrus.WithField("parish", newParish.ID).Info("new parish created")
	context.JSON(http.StatusOK, gin.H{"label": "info.parishCreated", "insertedID": insertedID})
}

// UpdateParish updates a Parish.
func (ctrl *ParishController) UpdateParish(context *gin.Context) {
	var dto dto.ParishProfileDto

	decoder := json.NewDecoder(context.Request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&dto)
	if err != nil {
		context.AbortWithStatus(http.StatusBadRequest)
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	oldParish, err := ctrl.Store.FindByID(dto.ID.Hex())
	if err != nil {
		context.AbortWithStatus(http.StatusNotFound)
		logrus.WithField("error", err.Error()).Error("entity not found")
		return
	}

	logrus.WithField("ID:", dto.ID).Info("updating parish")
	newParish := assembler.ParishProfileUpdateAssembler(dto)
	err = ctrl.Store.Update(&newParish)
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	// check if the name of the parish has changed
	if oldParish.Name != dto.Name { // update priests with new placement location
		logrus.WithField("ID:", dto.ID).Info("updating priests with new placement location")

		err = ctrl.PriestStore.UpdatePlacementLocation(dto.ID.Hex(), dto.Name)
		if err != nil {
			context.AbortWithStatus(http.StatusInternalServerError)
			logrus.WithField("error", err.Error()).Error("database error")
			return
		}
	}

	logrus.WithField("ID:", dto.ID).Info("updating was successful")
	context.JSON(http.StatusOK, nil)
}

// DeleteParish deletes a Parish - but only if it has no allocations.
func (ctrl *ParishController) DeleteParish(context *gin.Context) {
	id := context.Param("id")

	parish, err := ctrl.Store.FindByID(id)
	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"label": "error.server"})
		logrus.WithField("parishID", id).Error("parish not found")
		return
	}

	// check for allocations
	if len(parish.MainPriests) > 0 || len(parish.AssistantPriests) > 0 {
		context.JSON(http.StatusConflict, gin.H{"label": "error.parishNotRemovable"})
		logrus.WithField("ID", parish.Name).Info("Parish cannot be deleted, still has allocations")
		return
	}

	err = ctrl.Store.Delete(id)
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		context.JSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	logrus.WithField("ID:", id).Info("deletion was successful")
	context.JSON(http.StatusOK, gin.H{"label": "info.deleteSuccessful"})
}
