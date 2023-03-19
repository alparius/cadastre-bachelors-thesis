package importer

import (
	"encoding/json"
	"io/ioutil"
	"kataszter-backend/model"
	"os"

	"github.com/sirupsen/logrus"
)

// JsonDataSetup loads data from JSON files into the Mongo database.
func (imp *Importer) JsonDataSetup(mode string) {
	imp.priestsJsonDataSetup(mode)
	imp.parishJsonDataSetup(mode)
	imp.usersJsonDataSetup(mode)
	imp.forgotPasswordDataSetup(mode)
	imp.articleJsonDataSetup(mode)
	logrus.Info("Imported " + mode + " data from JSON into MongoDb!")
}

// readFile reads and returns the bytes of the given file.
func readFile(filename string) ([]byte, error) {
	jsonFile, err := os.Open(filename)
	if err != nil {
		logrus.Error(err)
		return nil, err
	}
	defer jsonFile.Close()

	byteValue, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		logrus.Error(err)
		return nil, err
	}

	return byteValue, nil
}

// priestsJsonDataSetup loads demo Priest data into the Mongo database.
func (imp *Importer) priestsJsonDataSetup(prefix string) {
	fileData, err := readFile("static/database/" + prefix + "/priestsData.json")
	if err != nil {
		logrus.Error(err)
	}

	var priests []model.Priest
	err = json.Unmarshal(fileData, &priests)
	if err != nil {
		logrus.Error(err)
	}

	priestMongoStore := imp.MongoStore.GetPriestStore()

	err = priestMongoStore.DeleteAll()
	if err != nil {
		logrus.Error(err)
	}

	err = priestMongoStore.InsertMany(&priests)
	if err != nil {
		logrus.Error(err)
	}
}

// parishJsonDataSetup loads Parish data into the Mongo database.
func (imp *Importer) parishJsonDataSetup(prefix string) {
	fileData, err := readFile("static/database/" + prefix + "/parishesData.json")
	if err != nil {
		logrus.Error(err)
	}

	var parishes []model.Parish
	err = json.Unmarshal(fileData, &parishes)
	if err != nil {
		logrus.Error(err)
	}

	parishMongoStore := imp.MongoStore.GetParishStore()

	err = parishMongoStore.DeleteAll()
	if err != nil {
		logrus.Error(err)
	}

	err = parishMongoStore.InsertMany(&parishes)
	if err != nil {
		logrus.Error(err)
	}
}

// usersJsonDataSetup loads User data into the Mongo database.
func (imp *Importer) usersJsonDataSetup(prefix string) {
	fileData, err := readFile("static/database/" + prefix + "/usersData.json")
	if err != nil {
		logrus.Error(err)
	}

	var users []model.User
	err = json.Unmarshal(fileData, &users)
	if err != nil {
		logrus.Error(err)
	}

	userMongoStore := imp.MongoStore.GetUserStore()

	err = userMongoStore.DeleteAll()
	if err != nil {
		logrus.Error(err)
	}

	err = userMongoStore.InsertMany(&users)
	if err != nil {
		logrus.Error(err)
	}
}

// forgotPasswordDataSetup deletes all tokens in Mongo database.
func (imp *Importer) forgotPasswordDataSetup(prefix string) {
	fileData, err := readFile("static/database/" + prefix + "/forgotPasswordData.json")
	if err != nil {
		logrus.Error(err)
	}
	var newPasswords []model.NewPasswordToken
	err = json.Unmarshal(fileData, &newPasswords)
	if err != nil {
		logrus.Error(err)
	}

	newPasswordMongoStore := imp.MongoStore.GetNewPasswordStore()

	err = newPasswordMongoStore.DeleteAll()
	if err != nil {
		logrus.Error(err)
	}

	err = newPasswordMongoStore.InsertMany(&newPasswords)
	if err != nil {
		logrus.Error(err)
	}
}

// articleDataSetup loads articles data into the Mongo database
func (imp *Importer) articleJsonDataSetup(prefix string) {
	fileData, err := readFile("static/database/" + prefix + "/articlesData.json")
	if err != nil {
		logrus.Error(err)
	}

	var articles []model.Article
	err = json.Unmarshal(fileData, &articles)
	if err != nil {
		logrus.Error(err)
	}

	articleMongoStore := imp.MongoStore.GetArticleStore()

	err = articleMongoStore.DeleteAll()
	if err != nil {
		logrus.Error(err)
	}

	err = articleMongoStore.InsertMany(&articles)
	if err != nil {
		logrus.Error(err)
	}
}
