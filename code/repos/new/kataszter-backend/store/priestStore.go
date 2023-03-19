package store

import (
	"kataszter-backend/model"
)

type PriestStore interface {
	FindByID(ID string) (*model.Priest, error)
	FindAllByFilter(filters map[string]string) (*[]model.Priest, error)
	Insert(*model.Priest) (string, error)
	InsertMany(priest *[]model.Priest) error
	Update(priest *model.Priest) error
	DeleteAll() error
	Delete(ID string) error
	UpdatePlacementLocation(parishID string, parishName string) error
}
