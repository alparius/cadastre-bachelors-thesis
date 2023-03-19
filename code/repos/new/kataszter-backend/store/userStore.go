package store

import (
	"kataszter-backend/model"
)

type UserStore interface {
	FindByID(ID string) (*model.User, error)
	FindByEmail(email string) (*model.User, error)
	FindAll() (*[]model.User, error)
	GetAdminMails() ([]string, error)
	Insert(user *model.User) error
	InsertMany(user *[]model.User) error
	Update(user *model.User) error
	Delete(ID string) error
	DeleteAll() error
}
