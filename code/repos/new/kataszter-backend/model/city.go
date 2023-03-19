package model

type City struct {
	Name     string   `json:"name,omitempty" bson:"name,omitempty"`
	Parishes []Parish `json:"parishes,omitempty" bson:"parishes,omitempty"`
}
