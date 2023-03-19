package model

type Date struct {
	Year    int    `json:"year,omitempty" bson:"year,omitempty"`
	Month   int    `json:"month,omitempty" bson:"month,omitempty"`
	Day     int    `json:"day,omitempty" bson:"day,omitempty"`
	Comment string `json:"comment,omitempty" bson:"comment,omitempty"`
}
