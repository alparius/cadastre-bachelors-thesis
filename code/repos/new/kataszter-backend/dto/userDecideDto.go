package dto

import "go.mongodb.org/mongo-driver/bson/primitive"

type UserDecideDto struct {
	ID      primitive.ObjectID `json:"ID,omitempty"`
	Message string             `json:"message,omitempty"`
	Role    string             `json:"role,omitempty"`
}
