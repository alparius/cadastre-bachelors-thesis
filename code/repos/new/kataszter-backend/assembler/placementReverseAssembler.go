package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// MinPlacementDtoToAssistantPriestPlaceAssembler converts a MinPlacementDto into an AssistantPriestPlace.
func MinPlacementDtoToAssistantPriestPlaceAssembler(p *dto.MinPlacementDto) model.AssistantPriestPlace {
	return model.AssistantPriestPlace{
		ID:        p.ID,
		PlaceID:   p.PlaceID,
		Place:     p.Place,
		StartDate: p.StartDate,
		EndDate:   p.EndDate,
	}
}

// MainPriestPlaceDtoToMainPriestPlaceAssembler converts a MainPriestPlaceDto into a MainPriestPlace.
func MainPriestPlaceDtoToMainPriestPlaceAssembler(p *dto.MainPriestPlaceDto) model.MainPriestPlace {
	return model.MainPriestPlace{
		ID:                       p.ID,
		PlaceID:                  p.PlaceID,
		Place:                    p.Place,
		StartDate:                p.StartDate,
		EndDate:                  p.EndDate,
		MunimentGenesisDate:      p.MunimentGenesisDate,
		MunimentNumber:           p.MunimentNumber,
		MunimentIssuingAuthority: p.MunimentIssuingAuthority,
		Income:                   p.Income,
		NumberOfPeople:           p.NumberOfPeople,
	}
}

// MinPlacementDtoTosAssistantPriestPlacesAssembler converts an array of MinPlacementDtos into an array of AssistantPriestPlaces.
func MinPlacementDtosToAssistantPriestPlacesAssembler(dtos *[]dto.MinPlacementDto) []model.AssistantPriestPlace {
	var result []model.AssistantPriestPlace
	for _, p := range *dtos {
		result = append(result, MinPlacementDtoToAssistantPriestPlaceAssembler(&p))
	}
	return result
}

// MainPriestPlaceDtosToMainPriestPlacesAssembler converts an array of MainPriestPlaceDtos into an array of MainPriestPlaces.
func MainPriestPlaceDtosToMainPriestPlacesAssembler(dtos *[]dto.MainPriestPlaceDto) []model.MainPriestPlace {
	var result []model.MainPriestPlace
	for _, p := range *dtos {
		result = append(result, MainPriestPlaceDtoToMainPriestPlaceAssembler(&p))
	}
	return result
}
