package model

type DisciplinaryMatter struct {
	Name             string `json:"name,omitempty" bson:"name,omitempty"`
	IssuingAuthority string `json:"issuingAuthority,omitempty" bson:"issuingAuthority,omitempty"`
}
