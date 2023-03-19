package model

type PastNames struct {
	Name      string `json:"name,omitempty" bson:"name,omitempty"`
	StartDate Date   `json:"startDate,omitempty" bson:"startDate,omitempty"`
	EndDate   Date   `json:"endDate,omitempty" bson:"endDate,omitempty"`
}
