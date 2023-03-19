package importer

import (
	"kataszter-backend/shared/config"
	"kataszter-backend/store/mongodb"

	"github.com/sirupsen/logrus"
)

type Importer struct {
	MongoStore *mongodb.MongoStore
}

const DEVELOPMENT = "dev"
const PRODUCTION = "prod"
const MYSQL_PRODUCTION = "mysql_prod"

// ImportDatabase decides on loading demo or production data based on config files.
func (imp *Importer) ImportDatabase() {

	switch config.DatabaseImportType {

	case DEVELOPMENT:
		imp.JsonDataSetup(DEVELOPMENT)

	case PRODUCTION:
		imp.JsonDataSetup(PRODUCTION)

	case MYSQL_PRODUCTION:
		imp.MySqlDataSetup()

	default:
		logrus.Warn("Invalid configuration. No DB import was done.")
	}
}
