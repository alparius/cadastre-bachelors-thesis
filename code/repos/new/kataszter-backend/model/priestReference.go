package model

type PriestReference struct {
	Place string `json:"place,omitempty" bson:"place,omitempty"`
	Date  Date   `json:"date,omitempty" bson:"date,omitempty"`
}
