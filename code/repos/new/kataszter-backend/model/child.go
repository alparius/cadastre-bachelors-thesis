package model

type Child struct {
	PriestSqlID int    `json:"priestSqlID,omitempty" bson:"priestSqlID,omitempty"`
	Name        string `json:"name,omitempty" bson:"name,omitempty"`
	BirthPlace  string `json:"birthPlace,omitempty" bson:"birthPlace,omitempty"`
	BirthDate   Date   `json:"birthDate,omitempty" bson:"birthDate,omitempty"`
}
