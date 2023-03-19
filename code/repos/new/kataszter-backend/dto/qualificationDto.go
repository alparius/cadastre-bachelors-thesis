package dto

import "kataszter-backend/model"

type QualificationDto struct {
	DiplomaName      string     `json:"diplomaName,omitempty" `
	GenesisDate      model.Date `json:"genesisDate,omitempty"`
	IssuingAuthority string     `issuingAuthority:"job,omitempty"`
}
