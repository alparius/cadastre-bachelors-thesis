package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// PriestToPriestProfileDtoAssembler converts a Priest into a PriestGeneralDto
func PriestToPriestProfileDtoAssembler(priest model.Priest) dto.PriestProfileDto {
	return dto.PriestProfileDto{
		ID:                    priest.ID,
		Name:                  priest.Name,
		Verified:              priest.Verified,
		BirthDate:             priest.BirthDate,
		DeathDate:             priest.DeathDate,
		SubscriptionDate:      priest.SubscriptionDate,
		GraduationDate:        priest.GraduationDate,
		BirthCountry:          priest.BirthCountry,
		BirthCounty:           priest.BirthCounty,
		BirthTown:             priest.BirthTown,
		Diocese:               priest.Diocese,
		IsMarried:             priest.IsMarried,
		IsWidow:               priest.IsWidow,
		IsDivorced:            priest.IsDivorced,
		Father:                priest.Father,
		Mother:                priest.Mother,
		RetirementDate:        priest.RetirementDate,
		Children:              ChildrenToChildDtosAssembler(&priest.Children),
		Spouses:               SpousesToSpouseDtosAssembler(&priest.Spouses),
		Qualifications:        QualificationsToQualificationDtosAssembler(&priest.Qualifications),
		AssistantPriestPlaces: AssistantPriestPlacesToMinPlacementDtosAssembler(&priest.AssistantPriestPlaces),
		MainPriestPlaces:      MainPriestPlacesToMainPriestPlaceDtosAssembler(&priest.MainPriestPlaces),
		WritingSkills:         priest.WritingSkills,
		SpeakingSkills:        priest.SpeakingSkills,
		Army:                  priest.Army,
		Consecration:          priest.Consecration,
		ChurchOffices:         priest.ChurchOffices,
		OtherOffices:          priest.OtherOffices,
		LiteraryWorks:         priest.LiteraryWorks,
		PriestReferences:      priest.PriestReferences,
		DisciplinaryMatters:   priest.DisciplinaryMatters,
		Suspensions:           priest.Suspensions,
		Resigned:              priest.Resigned,
		Fired:                 priest.Fired,
		ChangedCareer:         priest.ChangedCareer,
		Note:                  priest.Note,
		Files:                 priest.Files,
		Pictures:              priest.Pictures,
	}
}
