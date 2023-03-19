package assembler

import (
	"kataszter-backend/model"
)

// AssistantPriestPlaceToParishPlacementAssembler converts an AssistantPriestPlace into a ParishPlacement.
func AssistantPriestPlaceToParishPlacementAssembler(p *model.AssistantPriestPlace, priest model.Priest) model.ParishPlacement {
	return model.ParishPlacement{
		ID:         p.ID,
		StartDate:  p.StartDate,
		EndDate:    p.EndDate,
		PriestID:   priest.ID,
		PriestName: priest.Name,
	}
}

// MainPriestPlaceToParishPlacementAssembler converts a MainPriestPlace into a ParishPlacement.
func MainPriestPlaceToParishPlacementAssembler(p *model.MainPriestPlace, priest model.Priest) model.ParishPlacement {
	return model.ParishPlacement{
		ID:             p.ID,
		StartDate:      p.StartDate,
		EndDate:        p.EndDate,
		NumberOfPeople: p.NumberOfPeople,
		PriestID:       priest.ID,
		PriestName:     priest.Name,
	}
}
