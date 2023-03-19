package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// ChildToChildDtoAssembler converts a Child into a ChildDto.
func ChildDtoToChildAssembler(child *dto.ChildDto) model.Child {
	return model.Child{
		Name:       child.Name,
		BirthPlace: child.BirthPlace,
		BirthDate:  child.BirthDate,
	}
}

// ChildrenToChildDtosAssembler converts an array of Children into an array of ChildDtos.
func ChildDtosToChildrenAssembler(children *[]dto.ChildDto) []model.Child {
	var result []model.Child
	for _, c := range *children {
		result = append(result, ChildDtoToChildAssembler(&c))
	}
	return result
}
