package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// ChildToChildDtoAssembler converts a Child into a ChildDto.
func ChildToChildDtoAssembler(child *model.Child) dto.ChildDto {
	return dto.ChildDto{
		Name:       child.Name,
		BirthPlace: child.BirthPlace,
		BirthDate:  child.BirthDate,
	}
}

// ChildrenToChildDtosAssembler converts an array of Children into an array of ChildDtos.
func ChildrenToChildDtosAssembler(children *[]model.Child) []dto.ChildDto {
	var result []dto.ChildDto
	for _, c := range *children {
		result = append(result, ChildToChildDtoAssembler(&c))
	}
	return result
}
