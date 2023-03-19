package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// ParishToParishProfileDtoAssembler converts a Parish into a ParishGeneralDto
func ParishToParishProfileDtoAssembler(parish model.Parish) dto.ParishProfileDto {
	return dto.ParishProfileDto{
		ID:               parish.ID,
		Name:             parish.Name,
		CityName:         parish.CityName,
		Verified:         parish.Verified,
		Description:      parish.Description,
		History:          parish.History,
		PastNames:        parish.PastNames,
		Coordinates:      parish.Coordinates,
		AssistantPriests: parish.AssistantPriests,
		MainPriests:      parish.MainPriests,
	}
}
