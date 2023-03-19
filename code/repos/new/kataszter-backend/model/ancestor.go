package model

type Ancestor struct {
	Name      string `json:"name,omitempty" bson:"name,omitempty"`
	Job       string `json:"job,omitempty" bson:"job,omitempty"`
	BirthDate Date   `json:"birthDate,omitempty" bson:"birthDate,omitempty"`
	DeathDate Date   `json:"deathDate,omitempty" bson:"deathDate,omitempty"`
}
