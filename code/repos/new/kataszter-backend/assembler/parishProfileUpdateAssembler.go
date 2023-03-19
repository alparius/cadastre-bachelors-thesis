package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// ParishProfileUpdateAssembler updates parish model
func ParishProfileUpdateAssembler(newParish dto.ParishProfileDto) model.Parish {
	return model.Parish{
		ID:               newParish.ID,
		Name:             newParish.Name,
		CityName:         newParish.CityName,
		Verified:         newParish.Verified,
		Description:      newParish.Description,
		History:          newParish.History,
		PastNames:        newParish.PastNames,
		Coordinates:      newParish.Coordinates,
		AssistantPriests: newParish.AssistantPriests,
		MainPriests:      newParish.MainPriests,
	}
}
