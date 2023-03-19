package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// AssistantPriestPlaceToMinPlacementDtoAssembler converts an AssistantPriestPlace into a MinPlacementDto.
func AssistantPriestPlaceToMinPlacementDtoAssembler(p *model.AssistantPriestPlace) dto.MinPlacementDto {
	return dto.MinPlacementDto{
		ID:        p.ID,
		PlaceID:   p.PlaceID,
		Place:     p.Place,
		StartDate: p.StartDate,
		EndDate:   p.EndDate,
	}
}

// MainPriestPlaceToMinPlacementDtoAssembler converts a MainPriestPlace into a MinPlacementDto.
func MainPriestPlaceToMinPlacementDtoAssembler(p *model.MainPriestPlace) dto.MinPlacementDto {
	return dto.MinPlacementDto{
		ID:        p.ID,
		PlaceID:   p.PlaceID,
		Place:     p.Place,
		StartDate: p.StartDate,
		EndDate:   p.EndDate,
	}
}

// AssistantPriestPlacesToMinPlacementDtosAssembler converts an array of AssistantPriestPlaces into an array of MinPlacementDtos.
func AssistantPriestPlacesToMinPlacementDtosAssembler(places *[]model.AssistantPriestPlace) []dto.MinPlacementDto {
	var result []dto.MinPlacementDto
	for _, p := range *places {
		result = append(result, AssistantPriestPlaceToMinPlacementDtoAssembler(&p))
	}
	return result
}

// MainPriestPlacesToMinPlacementDtosAssembler converts an array of MainPriestPlaces into an array of MinPlacementDtos.
func MainPriestPlacesToMinPlacementDtosAssembler(places *[]model.MainPriestPlace) []dto.MinPlacementDto {
	var result []dto.MinPlacementDto
	for _, p := range *places {
		result = append(result, MainPriestPlaceToMinPlacementDtoAssembler(&p))
	}
	return result
}
