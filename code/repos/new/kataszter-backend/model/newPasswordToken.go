package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type NewPasswordToken struct {
	ID       primitive.ObjectID `json:"ID,omitempty" bson:"_id,omitempty"`
	UserID   primitive.ObjectID `json:"userID,omitempty" bson:"userId,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
	DeadLine time.Time          `json:"deadLine,omitempty" bson:"deadLine,omitempty"`
}
