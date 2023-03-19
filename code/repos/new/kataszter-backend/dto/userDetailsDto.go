package dto

type UserDetailsDto struct {
	ID    string `json:"ID,omitempty"`
	Name  string `json:"name,omitempty"`
	Email string `json:"email,omitempty"`
	Role  string `json:"role,omitempty"`
}
