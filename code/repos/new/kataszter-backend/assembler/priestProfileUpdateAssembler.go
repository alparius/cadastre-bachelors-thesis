package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// PriestProfileUpdateAssembler updates priest model
func PriestProfileUpdateAssembler(oldPriest model.Priest, newPriest dto.PriestProfileDto) model.Priest {
	return model.Priest{
		ID:                    newPriest.ID,
		Name:                  newPriest.Name,
		Verified:              newPriest.Verified,
		BirthDate:             newPriest.BirthDate,
		DeathDate:             newPriest.DeathDate,
		SubscriptionDate:      newPriest.SubscriptionDate,
		GraduationDate:        newPriest.GraduationDate,
		BirthCountry:          newPriest.BirthCountry,
		BirthCounty:           newPriest.BirthCounty,
		BirthTown:             newPriest.BirthTown,
		Diocese:               newPriest.Diocese,
		IsMarried:             newPriest.IsMarried,
		IsWidow:               newPriest.IsWidow,
		IsDivorced:            newPriest.IsDivorced,
		Father:                newPriest.Father,
		Mother:                newPriest.Mother,
		SpeakingSkills:        newPriest.SpeakingSkills,
		WritingSkills:         newPriest.WritingSkills,
		Army:                  newPriest.Army,
		RetirementDate:        newPriest.RetirementDate,
		Children:              ChildDtosToChildrenAssembler(&newPriest.Children),
		Spouses:               SpouseDtosToSpousesAssembler(&newPriest.Spouses),
		Qualifications:        QualificationDtosToQualificationsAssembler(&newPriest.Qualifications),
		AssistantPriestPlaces: MinPlacementDtosToAssistantPriestPlacesAssembler(&newPriest.AssistantPriestPlaces),
		MainPriestPlaces:      MainPriestPlaceDtosToMainPriestPlacesAssembler(&newPriest.MainPriestPlaces),
		Consecration:          newPriest.Consecration,
		ChurchOffices:         newPriest.ChurchOffices,
		OtherOffices:          newPriest.OtherOffices,
		LiteraryWorks:         newPriest.LiteraryWorks,
		PriestReferences:      newPriest.PriestReferences,
		DisciplinaryMatters:   newPriest.DisciplinaryMatters,
		Suspensions:           newPriest.Suspensions,
		Resigned:              newPriest.Resigned,
		Fired:                 newPriest.Fired,
		ChangedCareer:         newPriest.ChangedCareer,
		Note:                  newPriest.Note,
		Files:                 oldPriest.Files,
		Pictures:              oldPriest.Pictures,
	}
}
