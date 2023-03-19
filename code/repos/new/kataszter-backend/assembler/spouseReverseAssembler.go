package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// SpouseToSpouseDtoAssembler converts a Spouse into a SpouseDto.
func SpouseDtoToSpouseAssembler(spouse *dto.SpouseDto) model.Spouse {
	return model.Spouse{
		Name:         spouse.Name,
		BirthDate:    spouse.BirthDate,
		Job:          spouse.Job,
		MarriageDate: spouse.MarriageDate,
		FatherName:   spouse.FatherName,
		MotherName:   spouse.MotherName,
	}
}

// SpousesToSpouseDtosAssembler converts an array of Spouses into an array of SpouseDtos.
func SpouseDtosToSpousesAssembler(spouses *[]dto.SpouseDto) []model.Spouse {
	var result []model.Spouse
	for _, w := range *spouses {
		result = append(result, SpouseDtoToSpouseAssembler(&w))
	}
	return result
}
