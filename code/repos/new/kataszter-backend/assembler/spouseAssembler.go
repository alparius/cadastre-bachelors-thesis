package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// SpouseToSpouseDtoAssembler converts a Spouse into a SpouseDto.
func SpouseToSpouseDtoAssembler(spouse *model.Spouse) dto.SpouseDto {
	return dto.SpouseDto{
		Name:         spouse.Name,
		BirthDate:    spouse.BirthDate,
		Job:          spouse.Job,
		MarriageDate: spouse.MarriageDate,
		FatherName:   spouse.FatherName,
		MotherName:   spouse.MotherName,
	}
}

// SpousesToSpouseDtosAssembler converts an array of Spouses into an array of SpouseDtos.
func SpousesToSpouseDtosAssembler(spouses *[]model.Spouse) []dto.SpouseDto {
	var result []dto.SpouseDto
	for _, w := range *spouses {
		result = append(result, SpouseToSpouseDtoAssembler(&w))
	}
	return result
}
