package model

type Qualification struct {
	PriestSqlID      int    `json:"priestSqlID,omitempty" bson:"priestSqlID,omitempty"`
	DiplomaName      string `json:"diplomaName,omitempty" bson:"diplomaName,omitempty"`
	GenesisDate      Date   `json:"genesisDate,omitempty" bson:"genesisDate,omitempty"`
	IssuingAuthority string `json:"issuingAuthority,omitempty" bson:"issuingAuthority,omitempty"`
}
