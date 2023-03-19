package dto

import (
	"kataszter-backend/model"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MinPlacementDto struct {
	ID        primitive.ObjectID `json:"ID,omitempty"`
	PlaceID   primitive.ObjectID `json:"placeID,omitempty"`
	Place     string             `json:"place,omitempty"`
	StartDate model.Date         `json:"startDate,omitempty"`
	EndDate   model.Date         `json:"endDate,omitempty"`
}
