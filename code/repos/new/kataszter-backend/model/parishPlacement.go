package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type ParishPlacement struct {
	ID             primitive.ObjectID `json:"ID,omitempty" bson:"_id,omitempty"`
	PriestID       primitive.ObjectID `json:"priestID,omitempty" bson:"priestID,omitempty"`
	PriestName     string             `json:"priestName,omitempty" bson:"priestName,omitempty"`
	StartDate      Date               `json:"startDate,omitempty" bson:"startDate,omitempty"`
	EndDate        Date               `json:"endDate,omitempty" bson:"endDate,omitempty"`
	NumberOfPeople string             `json:"numberOfPeople,omitempty" bson:"numberOfPeople,omitempty"`
}
