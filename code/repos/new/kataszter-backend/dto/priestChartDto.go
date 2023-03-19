package dto

type PriestChartDto struct {
	BirthYear               int    `json:"birthYear"`
	DeathYear               int    `json:"deathYear"`
	SubscriptionYear        int    `json:"subscriptionYear"`
	GraduationYear          int    `json:"graduationYear"`
	ConsecrationYear        int    `json:"consecrationYear"`
	RetirementYear          int    `json:"retirementYear"`
	ResignedYear            int    `json:"resignedYear"`
	FiredYear               int    `json:"firedYear"`
	BirthCountry            string `json:"birthCountry"`
	BirthCounty             string `json:"birthCounty"`
	BirthTown               string `json:"birthTown"`
	Diocese                 string `json:"diocese"`
	IsMarried               bool   `json:"isMarried"`
	IsWidow                 bool   `json:"isWidow"`
	IsDivorced              bool   `json:"isDivorced"`
	IsChangedCareer         bool   `json:"isChangedCareer"`
	NrChildren              int    `json:"nrChildren"`
	NrSpouses               int    `json:"nrSpouses"`
	NrQualifications        int    `json:"nrQualifications"`
	NrAssistantPriestPlaces int    `json:"nrAssistantPriestPlaces"`
	NrMainPriestPlaces      int    `json:"nrMainPriestPlaces"`
	NrAllPlacements         int    `json:"nrAllPlacements"`
	NrChurchOffices         int    `json:"nrChurchOffices"`
	NrOtherOffices          int    `json:"nrOtherOffices"`
	NrLiteraryWorks         int    `json:"nrLiteraryWorks"`
	NrPriestReferences      int    `json:"nrPriestReferences"`
	NrDisciplinaryMatters   int    `json:"nrDisciplinaryMatters"`
	NrSuspensions           int    `json:"nrSuspensions"`
}
