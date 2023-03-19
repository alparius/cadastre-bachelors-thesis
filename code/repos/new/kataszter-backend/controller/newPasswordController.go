package controller

import (
	"encoding/json"
	"kataszter-backend/dto"
	"kataszter-backend/model"
	"kataszter-backend/shared/sendmail"
	"kataszter-backend/store"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

type NewPasswordController struct {
	NewPasswordStore store.NewPasswordStore
	UserStore        store.UserStore
}

// AddNewToken adds a new Token, for resetting password.
func (ctrl *NewPasswordController) AddNewToken(context *gin.Context) {
	var dto dto.NewPasswordDto

	decoder := json.NewDecoder(context.Request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&dto)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	if dto.Email == "" {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.Error("bad request, email field is empty")
		return
	}

	userWithThisEmail, err := ctrl.UserStore.FindByEmail(dto.Email)
	if userWithThisEmail == nil {
		context.AbortWithStatusJSON(http.StatusConflict, gin.H{"label": "error.accountNonExistent"})
		logrus.WithField("email", dto.Email).Info("user doesn't exist with this email")
		return
	}
	if err == nil {
		newPasswordToken := model.NewPasswordToken{
			Email:    dto.Email,
			UserID:   userWithThisEmail.ID,
			DeadLine: time.Now().Add(time.Hour * 48),
		}

		insertedTokenId, err := ctrl.NewPasswordStore.Insert(&newPasswordToken)
		if err != nil {
			context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
			logrus.WithField("error", err.Error()).Error("database error")
			return
		}
		if insertedTokenId != nil {
			err = sendmail.SendForgotPasswordMail([]string{userWithThisEmail.Email}, *userWithThisEmail, *(insertedTokenId))
			if err != nil {
				logrus.WithField("error", err.Error()).Error("sendmail error")
			}

			logrus.WithField("email", userWithThisEmail.Email).Info("Email send was successful for password reset")
			context.JSON(http.StatusOK, gin.H{"label": "info.passwordEmailSent"})
		}

	}
}

func (ctrl *NewPasswordController) UpdatePassword(context *gin.Context) {
	var dto dto.NewPasswordDto
	decoder := json.NewDecoder(context.Request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&dto)
	if err != nil {
		context.AbortWithStatus(http.StatusBadRequest)
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}
	token, err := ctrl.NewPasswordStore.FindByID(dto.ID.Hex())
	if err != nil || token == nil {
		context.JSON(http.StatusOK, false)
		logrus.WithField("tokenID", dto.ID).Error("token not found")
		return
	}
	userWithThisEmail, err := ctrl.UserStore.FindByEmail(token.Email)
	if userWithThisEmail == nil {
		context.AbortWithStatusJSON(http.StatusConflict, gin.H{"label": "error.accountNonExistent"})
		logrus.WithField("email", token.Email).Info("user doesn't exist with this email")
		return
	}
	if err != nil {
		context.AbortWithStatusJSON(http.StatusConflict, gin.H{"label": "error.accountNonExistent"})
		logrus.WithField("email", token.Email).Info("user doesn't exist with this email")
		return
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(dto.Password1), 5)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("password hash error")
		return
	}
	dto.Password1 = string(hash)

	logrus.WithField("ID:", dto.ID).Info("updating user")

	oldUser, err := ctrl.UserStore.FindByID(userWithThisEmail.ID.Hex())
	if err != nil {
		context.AbortWithStatus(http.StatusNotFound)
		logrus.WithField("error", err.Error()).Error("entity not found")
		return
	}
	oldUser.Password = dto.Password1
	err = ctrl.UserStore.Update(oldUser)
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	context.JSON(http.StatusOK, gin.H{"label": "info.updatePasswordSuccessful"})
	logrus.WithField("ID:", dto.ID).Info("updating was successful")
}

func (ctrl *NewPasswordController) ExistsWithIdAndValid(context *gin.Context) {
	id := context.Param("id")
	token, err := ctrl.NewPasswordStore.FindByID(id)
	if err != nil || token == nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("tokenID", id).Error("token not found, no match for id")
		return
	}
	if time.Now().Before(token.DeadLine) {
		logrus.WithField("ID", id).Info("exists token with id, returning true")
		context.JSON(http.StatusOK, true)
	} else {
		context.JSON(http.StatusOK, false)
	}
}
