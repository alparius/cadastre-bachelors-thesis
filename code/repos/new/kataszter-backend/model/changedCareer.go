package model

type ChangedCareer struct {
	Name string `json:"name,omitempty" bson:"name,omitempty"`
	Date Date   `json:"date,omitempty" bson:"date,omitempty"`
}
