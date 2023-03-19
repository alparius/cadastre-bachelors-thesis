package assembler

import (
	"kataszter-backend/dto"
	"kataszter-backend/model"
	"kataszter-backend/router/middleware/auth"
)

// UserLoginDtoToUser converts a UserLoginDto into a User.
func UserLoginDtoToUser(u *dto.UserLoginDto) model.User {
	return model.User{
		Email:    u.Email,
		Password: u.Password,
	}
}

// UserRegisterDtoToUser converts a UserRegisterDto into a User.
func UserRegisterDtoToUser(u *dto.UserRegisterDto) model.User {
	return model.User{
		Name:     u.Name,
		Email:    u.Email,
		Password: u.Password,
		Role:     auth.PENDING,
	}
}

// UserToUserDetailsDtoAssembler converts a User into a UserDetailsDto.
func UserToUserDetailsDtoAssembler(u *model.User) dto.UserDetailsDto {
	return dto.UserDetailsDto{
		ID:    u.ID.Hex(),
		Name:  u.Name,
		Email: u.Email,
		Role:  u.Role,
	}
}

// UsersToUserDetailsDtosAssembler converts an array of Users into an array of UserDetailsDtos.
func UsersToUserDetailsDtosAssembler(users *[]model.User) []dto.UserDetailsDto {
	var result []dto.UserDetailsDto
	for _, u := range *users {
		result = append(result, UserToUserDetailsDtoAssembler(&u))
	}
	return result
}
