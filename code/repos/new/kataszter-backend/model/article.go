package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Article struct {
	ID      primitive.ObjectID `json:"ID,omitempty" bson:"_id,omitempty"`
	Title   string             `json:"title,omitempty" bson:"title,omitempty"`
	Content string             `json:"content,omitempty" bson:"content,omitempty"`
	Date    string             `json:"date,omitempty" bson:"date,omitempty"`
}
