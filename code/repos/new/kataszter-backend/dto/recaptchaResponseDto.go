package dto

type RecaptchaResponseDto struct {
	Success     bool   `json:"success"`
	ChallengeTS string `json:"challenge_ts,omitempty"`
	Hostname    string `json:"hostname"`
}
