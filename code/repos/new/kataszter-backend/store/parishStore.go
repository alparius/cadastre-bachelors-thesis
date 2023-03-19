package store

import (
	"kataszter-backend/model"
)

type ParishStore interface {
	FindByID(ID string) (*model.Parish, error)
	FindAllByFilter(filters map[string]string) (*[]model.Parish, error)
	Insert(parish *model.Parish) (string, error)
	InsertMany(parishes *[]model.Parish) error
	Update(parish *model.Parish) error
	Delete(ID string) error
	DeleteAll() error
	DeletePriestReferences(ID string) error
	InsertPlacement(ID string, placement model.ParishPlacement, where string) error
	DeletePlacement(ID string, placement model.ParishPlacement, where string) error
}
