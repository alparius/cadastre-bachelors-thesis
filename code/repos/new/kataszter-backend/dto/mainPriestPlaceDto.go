package dto

import (
	"kataszter-backend/model"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MainPriestPlaceDto struct {
	ID                       primitive.ObjectID `json:"ID,omitempty"`
	PlaceID                  primitive.ObjectID `json:"placeID,omitempty"`
	Place                    string             `json:"place,omitempty"`
	StartDate                model.Date         `json:"startDate,omitempty"`
	EndDate                  model.Date         `json:"endDate,omitempty"`
	MunimentGenesisDate      model.Date         `json:"munimentGenesisDate,omitempty"`
	MunimentNumber           string             `json:"munimentNumber,omitempty"`
	MunimentIssuingAuthority string             `json:"munimentIssuingAuthority,omitempty"`
	Income                   string             `json:"income,omitempty"`
	NumberOfPeople           string             `json:"numberOfPeople,omitempty"`
}
