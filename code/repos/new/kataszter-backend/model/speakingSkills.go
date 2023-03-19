package model

type SpeakingSkills struct {
	Well   string `json:"well,omitempty" bson:"well,omitempty"`
	Medium string `json:"medium,omitempty" bson:"medium,omitempty"`
	Less   string `json:"less,omitempty" bson:"less,omitempty"`
}
