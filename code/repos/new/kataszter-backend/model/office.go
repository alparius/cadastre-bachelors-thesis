package model

type Office struct {
	Name      string `json:"name,omitempty" bson:"name,omitempty"`
	StartDate Date   `json:"startDate,omitempty" bson:"startDate,omitempty"`
	EndDate   Date   `json:"endDate,omitempty" bson:"endDate,omitempty"`
	Comment   string `json:"comment,omitempty" bson:"comment,omitempty"`
}
