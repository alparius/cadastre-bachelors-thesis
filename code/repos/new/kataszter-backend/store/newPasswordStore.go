package store

import (
	"kataszter-backend/model"
)

type NewPasswordStore interface {
	FindByID(ID string) (*model.NewPasswordToken, error)
	Insert(newPasswordToken *model.NewPasswordToken) (*string, error)
	InsertMany(newPasswordTokens *[]model.NewPasswordToken) error
	DeleteAll() error
}
