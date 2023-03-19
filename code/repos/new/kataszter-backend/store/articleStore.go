package store

import (
	"kataszter-backend/model"
)

type ArticleStore interface {
	FindByID(ID string) (*model.Article, error)
	FindAll() (*[]model.Article, error)
	Insert(parish *model.Article) (string, error)
	InsertMany(user *[]model.Article) error
	Update(parish *model.Article) error
	Delete(ID string) error
	DeleteAll() error
}
