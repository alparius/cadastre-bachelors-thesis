package dto

import (
	"kataszter-backend/model"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ParishDto struct {
	ID              primitive.ObjectID `json:"ID,omitempty"`
	Name            string             `json:"name,omitempty"`
	Verified        bool               `json:"verified,omitempty"`
	NumberOfPriests int                `json:"numberOfPriests,omitempty"`
	CityName        string             `json:"cityName,omitempty"`
	Coordinates     model.Coordinates  `json:"coordinates,omitempty" bson:"coordinates,omitempty"`
}
