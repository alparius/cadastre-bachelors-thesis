package dto

import (
	"kataszter-backend/model"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MinPriestDto struct {
	ID                    primitive.ObjectID `json:"ID,omitempty"`
	Name                  string             `json:"name,omitempty"`
	Verified              bool               `json:"verified,omitempty"`
	BirthDate             model.Date         `json:"birthDate,omitempty"`
	DeathDate             model.Date         `json:"deathDate,omitempty"`
	SubscriptionDate      model.Date         `json:"subscriptionDate,omitempty"`
	GraduationDate        model.Date         `json:"graduationDate,omitempty"`
	BirthTown             string             `json:"birthTown,omitempty"`
	BirthCountry          string             `json:"birthCountry,omitempty"`
	BirthCounty           string             `json:"birthCounty,omitempty"`
	Diocese               string             `json:"diocese,omitempty"`
	AssistantPriestPlaces []MinPlacementDto  `json:"assistantPriestPlaces,omitempty"`
	MainPriestPlaces      []MinPlacementDto  `json:"mainPriestPlaces,omitempty"`
}
