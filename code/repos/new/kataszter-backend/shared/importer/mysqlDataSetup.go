package importer

import (
	"kataszter-backend/model"
	"kataszter-backend/store/mysqldb"

	_ "github.com/go-sql-driver/mysql"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// MySqlDataSetup loads production data from MySQL into the Mongo database.
func (imp *Importer) MySqlDataSetup() {
	logrus.SetLevel(logrus.ErrorLevel) // its so much faster without logging

	imp.priestsMySqlDataSetup()
	imp.parishesMySqlDataSetup()
	imp.usersJsonDataSetup(PRODUCTION) // to always have a user

	logrus.SetLevel(logrus.TraceLevel)
	logrus.Info("Imported production data from MySQL into MongoDb!")
}

// priestsMySqlDataSetup creates the Priests Mongo collection from the MySQL database.
func (imp *Importer) priestsMySqlDataSetup() {
	mysqlStore := mysqldb.Init("mysql", "converter", "password", "127.0.0.1", "priestsdatabase")

	priests := mysqlStore.GetAllPriests()
	mysqlStore.AddAllSpouses(priests)
	mysqlStore.AddAllChildren(priests)
	mysqlStore.AddAllQualifications(priests)
	mysqlStore.AddAllAssistantPriestPlaces(priests)
	mysqlStore.AddAllMainPriestPlaces(priests)

	mongoStore := imp.MongoStore
	priestMongoStore := mongoStore.GetPriestStore()

	err := priestMongoStore.DeleteAll()
	if err != nil {
		logrus.Error(err)
	}

	for i := 0; i < len(*priests); i++ {
		_, err = priestMongoStore.Insert(&(*priests)[i])
		if err != nil {
			logrus.Error(err)
		}
	}
}

// parishesMySqlDataSetup creates the Parishes Mongo collection from the MySQL database.
func (imp *Importer) parishesMySqlDataSetup() {
	parishMongoStore := imp.MongoStore.GetParishStore()
	err := parishMongoStore.DeleteAll()
	if err != nil {
		logrus.Error(err)
	}

	priestStore := imp.MongoStore.GetPriestStore()
	priests, err := priestStore.FindAllByFilter(map[string]string{})
	if err != nil {
		logrus.Error(err)
	}

	for _, priest := range *priests {
		var newAssistantPriestPlaces = make([]model.AssistantPriestPlace, 0)
		var newMainPriestPlaces = make([]model.MainPriestPlace, 0)

		for _, place := range priest.AssistantPriestPlaces {
			var parishPlacement model.ParishPlacement
			parishPlacement.ID = place.ID
			parishPlacement.PriestID = priest.ID
			parishPlacement.PriestName = priest.Name
			parishPlacement.StartDate = place.StartDate
			parishPlacement.EndDate = place.EndDate

			filters := map[string]string{"name": "^" + place.Place + "$"}
			parishes, err := parishMongoStore.FindAllByFilter(filters)
			if err != nil {
				logrus.Error(err)
			}

			var parish model.Parish
			if len(*parishes) == 0 {
				var parishPlacements = make([]model.ParishPlacement, 0)
				parishPlacements = append(parishPlacements, parishPlacement)

				parish = model.Parish{
					ID:               primitive.NewObjectID(),
					Name:             place.Place,
					AssistantPriests: parishPlacements,
					MainPriests:      make([]model.ParishPlacement, 0),
				}
				_, err = parishMongoStore.Insert(&parish)
				if err != nil {
					logrus.Error(err)
				}
			} else {
				parish = (*parishes)[0]
				parish.AssistantPriests = append(parish.AssistantPriests, parishPlacement)
				err = parishMongoStore.Update(&parish)
				if err != nil {
					logrus.Error(err)
				}
			}
			place.PlaceID = parish.ID
			newAssistantPriestPlaces = append(newAssistantPriestPlaces, place)
		}

		for _, place := range priest.MainPriestPlaces {
			var parishPlacement model.ParishPlacement
			parishPlacement.ID = place.ID
			parishPlacement.PriestID = priest.ID
			parishPlacement.PriestName = priest.Name
			parishPlacement.StartDate = place.StartDate
			parishPlacement.EndDate = place.EndDate
			parishPlacement.NumberOfPeople = place.NumberOfPeople

			filters := map[string]string{"name": "^" + place.Place + "$"}
			parishes, err := parishMongoStore.FindAllByFilter(filters)
			if err != nil {
				logrus.Error(err)
			}

			var parish model.Parish
			if len(*parishes) == 0 {
				var parishPlacements = make([]model.ParishPlacement, 0)
				parishPlacements = append(parishPlacements, parishPlacement)

				parish = model.Parish{
					ID:               primitive.NewObjectID(),
					Name:             place.Place,
					AssistantPriests: make([]model.ParishPlacement, 0),
					MainPriests:      parishPlacements,
				}
				_, err = parishMongoStore.Insert(&parish)
				if err != nil {
					logrus.Error(err)
				}
			} else {
				parish = (*parishes)[0]
				parish.MainPriests = append(parish.MainPriests, parishPlacement)
				err = parishMongoStore.Update(&parish)
				if err != nil {
					logrus.Error(err)
				}
			}
			place.PlaceID = parish.ID
			newMainPriestPlaces = append(newMainPriestPlaces, place)
		}

		priest.AssistantPriestPlaces = newAssistantPriestPlaces
		priest.MainPriestPlaces = newMainPriestPlaces
		err = priestStore.Update(&priest)
		if err != nil {
			logrus.Error(err)
		}
	}

	logrus.Info("Created the parishes!")
}
