package model

type Coordinates struct {
	Lat float64 `json:"lat,string,omitempty" bson:"lat,omitempty"`
	Lng float64 `json:"lng,string,omitempty" bson:"lng,omitempty"`
}
