package dto

import "go.mongodb.org/mongo-driver/bson/primitive"

type NewPasswordDto struct {
	ID              primitive.ObjectID `json:"id,omitempty"`
	Password1       string             `json:"password,omitempty"`
	ConfirmPassword string             `json:"confirmPassword,omitempty"`
	Email           string             `json:"email,omitempty"`
}
