package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// PriestToMinPriestDtoAssembler converts a Priest into a MinPriestDto.
func PriestToMinPriestDtoAssembler(p *model.Priest) dto.MinPriestDto {
	return dto.MinPriestDto{
		ID:                    p.ID,
		Name:                  p.Name,
		Verified:              p.Verified,
		BirthDate:             p.BirthDate,
		DeathDate:             p.DeathDate,
		SubscriptionDate:      p.SubscriptionDate,
		GraduationDate:        p.GraduationDate,
		BirthTown:             p.BirthTown,
		BirthCountry:          p.BirthCountry,
		BirthCounty:           p.BirthCounty,
		Diocese:               p.Diocese,
		AssistantPriestPlaces: AssistantPriestPlacesToMinPlacementDtosAssembler(&p.AssistantPriestPlaces),
		MainPriestPlaces:      MainPriestPlacesToMinPlacementDtosAssembler(&p.MainPriestPlaces),
	}
}

// PriestsToMinPriestDtosAssembler converts an array of Priests into an array of MinPriestDtos.
func PriestsToMinPriestDtosAssembler(priests *[]model.Priest) []dto.MinPriestDto {
	var result []dto.MinPriestDto
	for _, p := range *priests {
		result = append(result, PriestToMinPriestDtoAssembler(&p))
	}
	return result
}
