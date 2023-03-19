package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Priest struct {
	ID                    primitive.ObjectID     `json:"ID,omitempty" bson:"_id,omitempty"`
	Name                  string                 `json:"name,omitempty" bson:"name,omitempty"`
	Verified              bool                   `json:"verified,omitempty" bson:"verified,omitempty"`
	BirthDate             Date                   `json:"birthDate,omitempty" bson:"birthDate,omitempty"`
	DeathDate             Date                   `json:"deathDate,omitempty" bson:"deathDate,omitempty"`
	SubscriptionDate      Date                   `json:"subscriptionDate,omitempty" bson:"subscriptionDate,omitempty"`
	GraduationDate        Date                   `json:"graduationDate,omitempty" bson:"graduationDate,omitempty"`
	BirthCountry          string                 `json:"birthCountry,omitempty" bson:"birthCountry,omitempty"`
	BirthCounty           string                 `json:"birthCounty,omitempty" bson:"birthCounty,omitempty"`
	BirthTown             string                 `json:"birthTown,omitempty" bson:"birthTown,omitempty"`
	Diocese               string                 `json:"diocese,omitempty" bson:"diocese,omitempty"`
	IsMarried             bool                   `json:"isMarried,omitempty" bson:"isMarried,omitempty"`
	IsWidow               bool                   `json:"isWidow,omitempty" bson:"isWidow,omitempty"`
	IsDivorced            bool                   `json:"isDivorced,omitempty" bson:"isDivorced,omitempty"`
	Father                Ancestor               `json:"father,omitempty" bson:"father,omitempty"`
	Mother                Ancestor               `json:"mother,omitempty" bson:"mother,omitempty"`
	SpeakingSkills        SpeakingSkills         `json:"speakingSkills,omitempty" bson:"speakingSkills,omitempty"`
	WritingSkills         WritingSkills          `json:"writingSkills,omitempty" bson:"writingSkills,omitempty"`
	Army                  string                 `json:"army,omitempty" bson:"army,omitempty"`
	RetirementDate        Date                   `json:"retirementDate,omitempty" bson:"retirementDate,omitempty"`
	Children              []Child                `json:"children,omitempty" bson:"children,omitempty"`
	Spouses               []Spouse               `json:"spouses,omitempty" bson:"spouses,omitempty"`
	Qualifications        []Qualification        `json:"qualifications,omitempty" bson:"qualifications,omitempty"`
	AssistantPriestPlaces []AssistantPriestPlace `json:"assistantPriestPlaces,omitempty" bson:"assistantPriestPlaces,omitempty"`
	MainPriestPlaces      []MainPriestPlace      `json:"mainPriestPlaces,omitempty" bson:"mainPriestPlaces,omitempty"`
	Consecration          Consecration           `json:"consecration,omitempty" bson:"consecration,omitempty"`
	ChurchOffices         []Office               `json:"churchOffices,omitempty" bson:"churchOffices,omitempty"`
	OtherOffices          []Office               `json:"otherOffices,omitempty" bson:"otherOffices,omitempty"`
	LiteraryWorks         []LiteraryWork         `json:"literaryWorks,omitempty" bson:"literaryWorks,omitempty"`
	PriestReferences      []PriestReference      `json:"priestReferences,omitempty" bson:"priestReferences,omitempty"`
	DisciplinaryMatters   []DisciplinaryMatter   `json:"disciplinaryMatters,omitempty" bson:"disciplinaryMatters,omitempty"`
	Suspensions           []Suspension           `json:"suspensions,omitempty" bson:"suspensions,omitempty"`
	Resigned              Date                   `json:"resigned,omitempty" bson:"resigned,omitempty"`
	Fired                 Date                   `json:"fired,omitempty" bson:"fired,omitempty"`
	ChangedCareer         ChangedCareer          `json:"changedCareer,omitempty" bson:"changedCareer,omitempty"`
	Note                  string                 `json:"note,omitempty" bson:"note,omitempty"`
	Files                 []string               `json:"files,omitempty" bson:"files,omitempty"`
	Pictures              []string               `json:"pictures,omitempty" bson:"pictures,omitempty"`
}
