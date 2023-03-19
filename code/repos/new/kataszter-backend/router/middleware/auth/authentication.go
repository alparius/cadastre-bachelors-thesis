package auth

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"github.com/thoas/go-funk"
)

const OWNER = "owner"
const ADMIN = "admin"
const EDITOR = "editor"
const READER = "reader"
const GUEST = "guest"
const PENDING = "pending"
const REFUSED = "refused"

const UserSessionKey = "UserSessionKey"
const AuthType = "AuthType"

// Authentication sets up the authentication middleware for gin.
func Authentication(roles ...string) gin.HandlerFunc {
	return func(context *gin.Context) {
		session := sessions.Default(context)
		if session == nil {
			context.AbortWithStatus(http.StatusUnauthorized)
			logrus.Info("unauthorized request blocked")
			return
		}

		userID := session.Get(UserSessionKey)
		if userID == nil {
			logrus.Info("unauthorized request blocked")
			context.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		if len(roles) != 0 {
			role := session.Get(AuthType).(string)
			if role == "" || !funk.ContainsString(roles, role) {
				context.AbortWithStatus(http.StatusForbidden)
				logrus.WithField("userID", userID).Warn("forbidden action by user with role")
				return
			}
		}

		// Add session verification here, like checking if the user and authType combination actually exists, if necessary.
		// Try adding caching this (redis) since this middleware might be called a lot.

		context.Next()
	}
}
