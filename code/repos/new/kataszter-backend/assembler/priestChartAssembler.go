package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// PriestToPriestChartDtoAssembler converts a Priest into a PriestChartDto.
func PriestToPriestChartDtoAssembler(p *model.Priest) dto.PriestChartDto {
	return dto.PriestChartDto{
		BirthYear:               p.BirthDate.Year,
		DeathYear:               p.DeathDate.Year,
		SubscriptionYear:        p.SubscriptionDate.Year,
		GraduationYear:          p.GraduationDate.Year,
		ConsecrationYear:        p.Consecration.Date.Year,
		RetirementYear:          p.RetirementDate.Year,
		ResignedYear:            p.Resigned.Year,
		FiredYear:               p.Fired.Year,
		BirthCountry:            p.BirthCountry,
		BirthCounty:             p.BirthCounty,
		BirthTown:               p.BirthTown,
		Diocese:                 p.Diocese,
		IsMarried:               p.IsMarried,
		IsWidow:                 p.IsWidow,
		IsDivorced:              p.IsDivorced,
		IsChangedCareer:         p.ChangedCareer.Name != "",
		NrChildren:              len(p.Children),
		NrSpouses:               len(p.Spouses),
		NrQualifications:        len(p.Qualifications),
		NrAssistantPriestPlaces: len(p.AssistantPriestPlaces),
		NrMainPriestPlaces:      len(p.MainPriestPlaces),
		NrAllPlacements:         len(p.AssistantPriestPlaces) + len(p.MainPriestPlaces),
		NrChurchOffices:         len(p.ChurchOffices),
		NrOtherOffices:          len(p.OtherOffices),
		NrLiteraryWorks:         len(p.LiteraryWorks),
		NrPriestReferences:      len(p.PriestReferences),
		NrDisciplinaryMatters:   len(p.DisciplinaryMatters),
		NrSuspensions:           len(p.Suspensions),
	}
}

// PriestsToPriestChartDtosAssembler converts an array of Priests into an array of PriestChartDto.
func PriestsToPriestChartDtosAssembler(priests *[]model.Priest) []dto.PriestChartDto {
	var result []dto.PriestChartDto
	for _, p := range *priests {
		result = append(result, PriestToPriestChartDtoAssembler(&p))
	}
	return result
}
