package main

import (
	"kataszter-backend/controller"
	"kataszter-backend/router"
	"kataszter-backend/shared/config"
	"kataszter-backend/shared/importer"
	"kataszter-backend/shared/logger"
	"kataszter-backend/shared/uploader"
	"kataszter-backend/store/mongodb"

	"github.com/sirupsen/logrus"
)

func main() {
	logger.Setup()
	config.Setup()
	uploader.Setup()

	store, err := mongodb.New(config.DatabaseURL, config.DatabaseName)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("store initialisation error")
	}

	importer := &importer.Importer{MongoStore: store}
	importer.ImportDatabase()

	priestCtrl := controller.PriestController{Store: store.GetPriestStore(), ParishStore: store.GetParishStore()}
	parishCtrl := controller.ParishController{Store: store.GetParishStore(), PriestStore: store.GetPriestStore()}
	userCtrl := controller.UserController{Store: store.GetUserStore()}
	newPasswordCtrl := controller.NewPasswordController{NewPasswordStore: store.GetNewPasswordStore(), UserStore: store.GetUserStore()}
	articleCtrl := controller.ArticleController{Store: store.GetArticleStore()}

	r := router.New(&priestCtrl, &parishCtrl, &userCtrl, &newPasswordCtrl, &articleCtrl)

	r.Run(config.Port)
}
