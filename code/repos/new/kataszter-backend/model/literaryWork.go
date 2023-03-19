package model

type LiteraryWork struct {
	Title     string `json:"title,omitempty" bson:"title,omitempty"`
	Published Date   `json:"published,omitempty" bson:"published,omitempty"`
	Publisher string `json:"publisher,omitempty" bson:"publisher,omitempty"`
}
