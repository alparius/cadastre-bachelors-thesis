package dto

import (
	"kataszter-backend/model"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ParishProfileDto struct {
	ID               primitive.ObjectID      `json:"ID,omitempty" bson:"_id,omitempty"`
	Name             string                  `json:"name,omitempty" bson:"name,omitempty"`
	CityName         string                  `json:"cityName,omitempty" bson:"cityName,omitempty"`
	Verified         bool                    `json:"verified,omitempty" bson:"verified,omitempty"`
	Description      string                  `json:"description,omitempty" bson:"description,omitempty"`
	History          string                  `json:"history,omitempty" bson:"history,omitempty"`
	PastNames        []model.PastNames       `json:"pastNames,omitempty" bson:"pastNames,omitempty"`
	Coordinates      model.Coordinates       `json:"coordinates,omitempty" bson:"coordinates,omitempty"`
	AssistantPriests []model.ParishPlacement `json:"assistantPriests,omitempty" bson:"assistantPriests,omitempty"`
	MainPriests      []model.ParishPlacement `json:"mainPriests,omitempty" bson:"mainPriests,omitempty"`
}
