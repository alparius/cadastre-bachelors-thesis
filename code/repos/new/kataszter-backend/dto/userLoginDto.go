package dto

type UserLoginDto struct {
	Email          string `json:"email,omitempty"`
	Password       string `json:"password,omitempty"`
	RecaptchaToken string `json:"recaptchaToken,omitempty"`
}
