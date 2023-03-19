package model

type Suspension struct {
	StartDate  Date   `json:"startDate,omitempty" bson:"startDate,omitempty"`
	EndDate    Date   `json:"endDate,omitempty" bson:"endDate,omitempty"`
	Punishment string `json:"punishment,omitempty" bson:"punishment,omitempty"`
}
