package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
)

// QualificationDtoToQualificationAssembler converts a Qualification into a QualificationDto.
func QualificationDtoToQualificationAssembler(qualification *dto.QualificationDto) model.Qualification {
	return model.Qualification{
		DiplomaName:      qualification.DiplomaName,
		GenesisDate:      qualification.GenesisDate,
		IssuingAuthority: qualification.IssuingAuthority,
	}
}

// QualificationDtosToQualificationsAssembler converts an array of Qualifications into an array of QualificationDtos.
func QualificationDtosToQualificationsAssembler(qualifications *[]dto.QualificationDto) []model.Qualification {
	var result []model.Qualification
	for _, q := range *qualifications {
		result = append(result, QualificationDtoToQualificationAssembler(&q))
	}
	return result
}
