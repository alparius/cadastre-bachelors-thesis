package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type AssistantPriestPlace struct {
	ID          primitive.ObjectID `json:"ID,omitempty" bson:"_id,omitempty"`
	PriestSqlID int                `json:"priestSqlID,omitempty" bson:"priestSqlID,omitempty"`
	PlaceID     primitive.ObjectID `json:"placeID,omitempty" bson:"placeID,omitempty"`
	Place       string             `json:"place,omitempty" bson:"place,omitempty"`
	StartDate   Date               `json:"startDate,omitempty" bson:"startDate,omitempty"`
	EndDate     Date               `json:"endDate,omitempty" bson:"endDate,omitempty"`
}
