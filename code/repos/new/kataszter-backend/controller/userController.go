package controller

import (
	"encoding/json"
	"kataszter-backend/assembler"
	"kataszter-backend/dto"
	"kataszter-backend/router/middleware/auth"
	"kataszter-backend/shared/config"
	"kataszter-backend/shared/sendmail"
	"kataszter-backend/store"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

type UserController struct {
	Store store.UserStore
}

// FindAllUsers returns all Users.
func (ctrl *UserController) FindAllUsers(context *gin.Context) {
	users, err := ctrl.Store.FindAll()
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("returning with error")
		return
	}

	if len(*users) == 0 {
		context.AbortWithStatus(http.StatusNoContent)
		logrus.Info("returning without results")
		return
	}

	userDetailsDtos := assembler.UsersToUserDetailsDtosAssembler(users)

	logrus.WithField("length", len(userDetailsDtos)).Info("returning Users")
	context.JSON(http.StatusOK, userDetailsDtos)
}

// Login checks if the given User credentials are correct.
func (ctrl *UserController) Login(context *gin.Context) {
	var userLoginDto dto.UserLoginDto

	decoder := json.NewDecoder(context.Request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&userLoginDto)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	if !verifyRecaptcha(userLoginDto.RecaptchaToken) {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.recaptcha"})
		logrus.WithField("token", userLoginDto.RecaptchaToken).Error("failed recaptcha")
		return
	}

	if userLoginDto.Email == "" || userLoginDto.Password == "" {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.Error("bad request")
		return
	}
	logrus.WithField("email", userLoginDto.Email).Info("login attempt")

	loggedInUser, err := ctrl.Store.FindByEmail(userLoginDto.Email)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"label": "error.badLogin"})
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}
	if loggedInUser == nil {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"label": "error.badLogin"})
		logrus.Info("invalid email")
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(loggedInUser.Password), []byte(userLoginDto.Password))
	if err != nil {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"label": "error.badLogin"})
		logrus.WithField("error", err.Error()).Info("invalid password")
		return
	}

	if loggedInUser.Role == auth.PENDING {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"label": "error.notProcessed"})
		logrus.Info("account not yet processed")
		return
	}

	loggedInUserDto := assembler.UserToUserDetailsDtoAssembler(loggedInUser)

	session := sessions.Default(context)
	session.Set(auth.UserSessionKey, loggedInUserDto.ID)
	session.Set(auth.AuthType, loggedInUserDto.Role)
	err = session.Save()
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("failed to generate session token")
		return
	}

	logrus.WithField("email", userLoginDto.Email).Info("login successful")
	context.JSON(http.StatusOK, gin.H{"label": "info.loginSuccessful"})
}

// GetMe returns the User associated with the current session.
func (ctrl *UserController) GetMe(context *gin.Context) {
	session := sessions.Default(context)
	userID := session.Get(auth.UserSessionKey)

	user, err := ctrl.Store.FindByID(userID.(string))
	if user == nil {
		context.AbortWithStatus(http.StatusNotFound)
		logrus.WithField("userID", userID).Error("session error")
		return
	}
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("store GetByID error")
		return
	}

	userDetailsDto := assembler.UserToUserDetailsDtoAssembler(user)
	logrus.WithField("userID", userID).Info("returning user")
	context.JSON(http.StatusOK, userDetailsDto)
}

// Logout destroys a User session.
func (ctrl *UserController) Logout(context *gin.Context) {
	session := sessions.Default(context)

	userID := session.Get(auth.UserSessionKey)
	if userID == nil || userID == "" {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.Error("invalid session token")
		return
	}

	session.Delete(auth.UserSessionKey)
	session.Delete(auth.AuthType)

	err := session.Save()
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("failed to generate session token")
		return
	}

	logrus.WithField("userID", userID).Info("logout successful")
	context.JSON(http.StatusOK, gin.H{"label": "info.logoutSuccessful"})
}

// Register adds a new User.
func (ctrl *UserController) Register(context *gin.Context) {
	var dto dto.UserRegisterDto

	decoder := json.NewDecoder(context.Request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&dto)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	if !verifyRecaptcha(dto.RecaptchaToken) {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.recaptcha"})
		logrus.Error("failed recaptcha")
		return
	}

	if dto.Name == "" || dto.Email == "" || dto.Password == "" || dto.Message == "" {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.Error("bad request")
		return
	}

	userWithThisEmail, err := ctrl.Store.FindByEmail(dto.Email)
	if err != nil {
		logrus.WithField("notError", err.Error()).Info("email not in use")
	}
	if userWithThisEmail != nil {
		context.AbortWithStatusJSON(http.StatusConflict, gin.H{"label": "error.accountExists"})
		logrus.Info("email address already in use")
		return
	}

	logrus.WithField("email", dto.Email).Info("registering user")

	hash, err := bcrypt.GenerateFromPassword([]byte(dto.Password), 5)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("password hash error")
		return
	}
	dto.Password = string(hash)
	user := assembler.UserRegisterDtoToUser(&dto)

	err = ctrl.Store.Insert(&user)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	adminsAddresses, err := ctrl.Store.GetAdminMails()
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("getmails error")
		return
	}
	err = sendmail.SendRegisterMail(adminsAddresses, dto.Message, user)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("sendmail error")
	}

	logrus.WithField("email", dto.Email).Info("register successful")
	context.JSON(http.StatusOK, gin.H{"label": "info.registerSuccessful"})
}

// DecideUser refuses or accepts a new User.
func (ctrl *UserController) DecideUser(context *gin.Context) {
	var dto dto.UserDecideDto

	decoder := json.NewDecoder(context.Request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&dto)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	userWithThisID, err := ctrl.Store.FindByID(dto.ID.Hex())
	if err != nil {
		context.AbortWithStatusJSON(http.StatusConflict, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	logrus.WithField("email", userWithThisID.Email).Info("deciding user")

	userWithThisID.Role = dto.Role

	err = ctrl.Store.Update(userWithThisID)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	err = sendmail.SendRegisterMail([]string{userWithThisID.Email}, dto.Message, *userWithThisID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("sendmail error")
	}

	logrus.WithField("email", userWithThisID.Email).Info("decision successful")
	context.JSON(http.StatusOK, gin.H{"label": "info.decideSuccessful"})
}

// DeleteUser deletes a User with given ID.
func (ctrl *UserController) DeleteUser(context *gin.Context) {
	id := context.Param("id")

	userWithThisID, err := ctrl.Store.FindByID(id)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	if userWithThisID.Role == auth.OWNER {
		context.AbortWithStatusJSON(http.StatusConflict, "owner cant be deleted")
		logrus.Info("owner cant be deleted")
		return
	}

	err = ctrl.Store.Delete(id)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.WithField("userID", id).Error("user not found")
		return
	}

	logrus.WithField("ID", id).Info("deleted a user")
	context.JSON(http.StatusOK, gin.H{"label": "info.deleteSuccessful"})
}

// SmtpStatus sends true if the smtp server is down.
func (ctrl *UserController) SmtpStatus(context *gin.Context) {
	context.JSON(http.StatusOK, sendmail.SmtpDown)
}

// verifyRecaptcha verifies a Google reCaptcha (v2) token.
func verifyRecaptcha(recaptchaToken string) bool {
	apiUrl := "https://www.google.com/recaptcha/api/siteverify"

	req, err := http.NewRequest("POST", apiUrl+"?secret="+config.RecaptchaSecretkey+"&response="+recaptchaToken, nil)
	if err != nil {
		logrus.WithField("error", err).Error("recaptcha verify error on request creation")
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		logrus.WithField("error", err).Error("recaptcha verify error on request post")
	}
	defer resp.Body.Close()

	var recaptchaResponse dto.RecaptchaResponseDto
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&recaptchaResponse)
	if err != nil {
		logrus.WithField("error", err).Error("recaptcha verify error on response decode")
	}

	return recaptchaResponse.Success
}
