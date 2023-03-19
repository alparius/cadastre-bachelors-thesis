package dto

import "kataszter-backend/model"

type SpouseDto struct {
	Name         string     `json:"name,omitempty" `
	BirthDate    model.Date `json:"birthDate,omitempty"`
	Job          string     `json:"job,omitempty"`
	MarriageDate model.Date `json:"marriageDate,omitempty"`
	FatherName   string     `json:"fatherName,omitempty"`
	MotherName   string     `json:"motherName,omitempty"`
}
