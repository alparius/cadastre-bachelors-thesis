package config

import (
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

var DatabaseURL string
var DatabaseName string
var Port string
var SmtpHost string
var SmtpPort string
var EmailAddress string
var EmailPassword string
var DatabaseImportType string
var RecaptchaSecretkey string

// Setup sets up the global viper configuration.
func Setup() {
	viper.SetConfigName("config")
	viper.AddConfigPath(".")

	_ = viper.BindEnv("database_url")
	_ = viper.BindEnv("database_name")
	_ = viper.BindEnv("web_access_port")
	_ = viper.BindEnv("smtp_host")
	_ = viper.BindEnv("smtp_port")
	_ = viper.BindEnv("email_address")
	_ = viper.BindEnv("email_password")
	_ = viper.BindEnv("recaptcha_secretkey")
	_ = viper.BindEnv("database_import_type")

	err := viper.ReadInConfig()
	if err != nil {
		logrus.Error(err)
	}

	// load config values into variables
	DatabaseURL = viper.Get("database_url").(string)
	DatabaseName = viper.Get("database_name").(string)
	Port = viper.Get("web_access_port").(string)
	SmtpHost = viper.Get("smtp_host").(string)
	SmtpPort = viper.Get("smtp_port").(string)
	EmailAddress = viper.Get("email_address").(string)
	EmailPassword = viper.Get("email_password").(string)
	RecaptchaSecretkey = viper.Get("recaptcha_secretkey").(string)
	DatabaseImportType = viper.Get("database_import_type").(string)

	logrus.Info("database_url=", DatabaseURL)
	logrus.Info("database_name=", DatabaseName)
	logrus.Info("web_access_port=", Port)
	logrus.Info("email_address=", EmailAddress)
	logrus.Info("database_import_type=", DatabaseImportType)
}
