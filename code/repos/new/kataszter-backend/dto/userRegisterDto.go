package dto

type UserRegisterDto struct {
	Name           string `json:"name,omitempty"`
	Email          string `json:"email,omitempty"`
	Password       string `json:"password,omitempty"`
	Message        string `json:"message,omitempty"`
	RecaptchaToken string `json:"recaptchaToken,omitempty"`
}
