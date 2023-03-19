package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// ParishToParishDtoAssembler converts a Parish into a ParishDto.
func ParishToParishDtoAssembler(parish *model.Parish) dto.ParishDto {
	return dto.ParishDto{
		ID:              parish.ID,
		Name:            parish.Name,
		CityName:        parish.CityName,
		Verified:        parish.Verified,
		NumberOfPriests: len(parish.AssistantPriests) + len(parish.MainPriests),
		Coordinates:     parish.Coordinates,
	}
}

// ParishesToParishDtosAssembler converts an array of Parishes into an array of ParishDto.
func ParishesToParishDtosAssembler(parishes *[]model.Parish) []dto.ParishDto {
	var result []dto.ParishDto
	for _, p := range *parishes {
		result = append(result, ParishToParishDtoAssembler(&p))
	}
	return result
}
