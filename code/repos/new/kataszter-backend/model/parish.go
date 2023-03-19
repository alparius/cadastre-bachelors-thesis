package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Parish struct {
	ID               primitive.ObjectID `json:"ID,omitempty" bson:"_id,omitempty"`
	Name             string             `json:"name,omitempty" bson:"name,omitempty"`
	CityName         string             `json:"cityName,omitempty" bson:"cityName,omitempty"`
	Verified         bool               `json:"verified,omitempty" bson:"verified,omitempty"`
	Description      string             `json:"description,omitempty" bson:"description,omitempty"`
	History          string             `json:"history,omitempty" bson:"history,omitempty"`
	PastNames        []PastNames        `json:"pastNames,omitempty" bson:"pastNames,omitempty"`
	Coordinates      Coordinates        `json:"coordinates,omitempty" bson:"coordinates,omitempty"`
	AssistantPriests []ParishPlacement  `json:"assistantPriests,omitempty" bson:"assistantPriests,omitempty"`
	MainPriests      []ParishPlacement  `json:"mainPriests,omitempty" bson:"mainPriests,omitempty"`
	Pictures         []string           `json:"pictures,omitempty" bson:"pictures,omitempty"`
	Files            []string           `json:"files,omitempty" bson:"files,omitempty"`
}
