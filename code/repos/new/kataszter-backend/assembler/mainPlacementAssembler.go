package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// MainPriestPlaceToMainPriestPlaceDtoAssembler converts a MainPriestPlace into a MainPriestPlaceDto.
func MainPriestPlaceToMainPriestPlaceDtoAssembler(p *model.MainPriestPlace) dto.MainPriestPlaceDto {
	return dto.MainPriestPlaceDto{
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

// MainPriestPlacesToMainPriestPlaceDtosAssembler converts an array of MainPriestPlaces into an array of MainPriestPlaceDtos.
func MainPriestPlacesToMainPriestPlaceDtosAssembler(places *[]model.MainPriestPlace) []dto.MainPriestPlaceDto {
	var result []dto.MainPriestPlaceDto
	for _, p := range *places {
		result = append(result, MainPriestPlaceToMainPriestPlaceDtoAssembler(&p))
	}
	return result
}
