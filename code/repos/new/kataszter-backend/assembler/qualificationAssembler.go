package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// QualificationToQualificationDtoAssembler converts a Qualification into a QualificationDto.
func QualificationToQualificationDtoAssembler(qualification *model.Qualification) dto.QualificationDto {
	return dto.QualificationDto{
		DiplomaName:      qualification.DiplomaName,
		GenesisDate:      qualification.GenesisDate,
		IssuingAuthority: qualification.IssuingAuthority,
	}
}

// QualificationsToQualificationDtosAssembler converts an array of Qualifications into an array of QualificationDtos.
func QualificationsToQualificationDtosAssembler(qualifications *[]model.Qualification) []dto.QualificationDto {
	var result []dto.QualificationDto
	for _, q := range *qualifications {
		result = append(result, QualificationToQualificationDtoAssembler(&q))
	}
	return result
}
