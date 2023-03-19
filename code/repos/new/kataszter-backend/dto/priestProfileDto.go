package dto

import (
	"kataszter-backend/model"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PriestProfileDto struct {
	ID                    primitive.ObjectID         `json:"ID,omitempty"`
	Name                  string                     `json:"name,omitempty"`
	Verified              bool                       `json:"verified,omitempty"`
	BirthDate             model.Date                 `json:"birthDate,omitempty"`
	DeathDate             model.Date                 `json:"deathDate,omitempty"`
	SubscriptionDate      model.Date                 `json:"subscriptionDate,omitempty"`
	GraduationDate        model.Date                 `json:"graduationDate,omitempty"`
	BirthCountry          string                     `json:"birthCountry,omitempty"`
	BirthCounty           string                     `json:"birthCounty,omitempty"`
	BirthTown             string                     `json:"birthTown,omitempty"`
	Diocese               string                     `json:"diocese,omitempty"`
	IsMarried             bool                       `json:"isMarried,omitempty"`
	IsWidow               bool                       `json:"isWidow,omitempty"`
	IsDivorced            bool                       `json:"isDivorced,omitempty"`
	Father                model.Ancestor             `json:"father,omitempty"`
	Mother                model.Ancestor             `json:"mother,omitempty"`
	RetirementDate        model.Date                 `json:"retirementDate,omitempty"`
	Children              []ChildDto                 `json:"children"`
	Spouses               []SpouseDto                `json:"spouses"`
	Qualifications        []QualificationDto         `json:"qualifications"`
	AssistantPriestPlaces []MinPlacementDto          `json:"assistantPriestPlaces"`
	MainPriestPlaces      []MainPriestPlaceDto       `json:"mainPriestPlaces"`
	SpeakingSkills        model.SpeakingSkills       `json:"speakingSkills"`
	WritingSkills         model.WritingSkills        `json:"writingSkills"`
	Army                  string                     `json:"army"`
	Consecration          model.Consecration         `json:"consecration"`
	ChurchOffices         []model.Office             `json:"churchOffices"`
	OtherOffices          []model.Office             `json:"otherOffices"`
	LiteraryWorks         []model.LiteraryWork       `json:"literaryWorks"`
	PriestReferences      []model.PriestReference    `json:"priestReferences"`
	DisciplinaryMatters   []model.DisciplinaryMatter `json:"disciplinaryMatters"`
	Suspensions           []model.Suspension         `json:"suspensions"`
	Resigned              model.Date                 `json:"resigned"`
	Fired                 model.Date                 `json:"fired"`
	ChangedCareer         model.ChangedCareer        `json:"changedCareer"`
	Note                  string                     `json:"note"`
	Files                 []string                   `json:"files"`
	Pictures              []string                   `json:"pictures"`
}
