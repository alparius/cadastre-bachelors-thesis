package dto

import "kataszter-backend/model"

type ChildDto struct {
	Name       string     `json:"name,omitempty"`
	BirthPlace string     `json:"birthPlace,omitempty"`
	BirthDate  model.Date `json:"birthDate,omitempty"`
}
