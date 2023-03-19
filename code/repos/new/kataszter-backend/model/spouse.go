package model

type Spouse struct {
	PriestSqlID  int    `json:"priestSqlID,omitempty" bson:"priestSqlID,omitempty"`
	Name         string `json:"name,omitempty" bson:"name,omitempty"`
	BirthDate    Date   `json:"birthDate,omitempty" bson:"birthDate,omitempty"`
	Job          string `json:"job,omitempty" bson:"job,omitempty"`
	MarriageDate Date   `json:"marriageDate,omitempty" bson:"marriageDate,omitempty"`
	FatherName   string `json:"fatherName,omitempty" bson:"fatherName,omitempty"`
	MotherName   string `json:"motherName,omitempty" bson:"motherName,omitempty"`
}
