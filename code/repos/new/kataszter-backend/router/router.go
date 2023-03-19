package router

import (
	"kataszter-backend/controller"
	"kataszter-backend/router/middleware"
	"kataszter-backend/router/middleware/auth"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type MyRouter struct {
	priestCtrl      *controller.PriestController
	parishCtrl      *controller.ParishController
	userCtrl        *controller.UserController
	newPasswordCtrl *controller.NewPasswordController
	articleCtrl     *controller.ArticleController
	router          *gin.Engine
}

// New returns a custom router with middlewares and controllers injected.
func New(priestCtrl *controller.PriestController, parishCtrl *controller.ParishController, userCtrl *controller.UserController, newPasswordCtrl *controller.NewPasswordController, articleCtrl *controller.ArticleController) *MyRouter {
	router := gin.New()
	gin.ForceConsoleColor()

	// setting up middlewares
	router.Use(sessions.Sessions("mysession", cookie.NewStore([]byte("secret"))))
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(middleware.GinCors())

	return &MyRouter{priestCtrl: priestCtrl, parishCtrl: parishCtrl, userCtrl: userCtrl, newPasswordCtrl: newPasswordCtrl, articleCtrl: articleCtrl, router: router}
}

// Run sets up the rest api endpoints and starts the router.
func (myRouter *MyRouter) Run(port string) {

	priests := myRouter.router.Group("/api")
	{
		priests.GET("/priest/:id", auth.Authentication(auth.READER, auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.priestCtrl.FindPriestByID)
		priests.GET("/priests", auth.Authentication(), myRouter.priestCtrl.FindAllPriestsByFilter)
		priests.POST("/priest", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.priestCtrl.CreatePriest)
		priests.PUT("/priest", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.priestCtrl.UpdatePriest)
		priests.DELETE("/priest/:id", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.priestCtrl.DeletePriest)
		//priests.POST("/priests/:id/files", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.priestCtrl.UploadFile)
		//priests.GET("/priests/:id/files/:fileName", auth.Authentication(auth.READER, auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.priestCtrl.GetFile)
		//priests.DELETE("/priests/:id/files/:fileName", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.priestCtrl.DeleteFile)
		//priests.POST("/priests/:id/pictures", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.priestCtrl.UploadPicture)
		//priests.GET("/priests/:id/pictures/:pictureName", auth.Authentication(auth.READER, auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.priestCtrl.GetPicture)
		//priests.DELETE("/priests/:id/pictures/:fileName", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.priestCtrl.DeletePicture)
	}

	parishes := myRouter.router.Group("/api")
	{
		parishes.GET("/parish/:id", auth.Authentication(), myRouter.parishCtrl.FindParishByID)
		parishes.GET("/parishes", auth.Authentication(), myRouter.parishCtrl.FindAllParishesByFilter)
		parishes.POST("/parish", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.parishCtrl.CreateParish)
		parishes.PUT("/parish", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.parishCtrl.UpdateParish)
		parishes.DELETE("/parish/:id", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.parishCtrl.DeleteParish)
		//parishes.POST("/parishes/:id/files", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.parishCtrl.UploadFile)
		//parishes.GET("/parishes/:id/files/:fileName", auth.Authentication(auth.READER, auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.parishCtrl.GetFile)
		//parishes.DELETE("/parishes/:id/files/:fileName", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.parishCtrl.DeleteFile)
		//parishes.POST("/parishes/:id/pictures", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.parishCtrl.UploadPicture)
		//parishes.GET("/parishes/:id/pictures/:pictureName", auth.Authentication(auth.READER, auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.parishCtrl.GetPicture)
		//parishes.DELETE("/parishes/:id/pictures/:fileName", auth.Authentication(auth.EDITOR, auth.ADMIN, auth.OWNER), myRouter.parishCtrl.DeletePicture)
	}

	users := myRouter.router.Group("/api")
	{
		users.GET("/users", auth.Authentication(auth.ADMIN, auth.OWNER), myRouter.userCtrl.FindAllUsers)
		users.GET("/user/me", auth.Authentication(), myRouter.userCtrl.GetMe)
		users.POST("/user/decide", auth.Authentication(auth.ADMIN, auth.OWNER), myRouter.userCtrl.DecideUser)
		users.DELETE("/user/:id", auth.Authentication(auth.ADMIN, auth.OWNER), myRouter.userCtrl.DeleteUser)
		users.POST("/login", myRouter.userCtrl.Login)
		users.POST("/logout", auth.Authentication(), myRouter.userCtrl.Logout)
		users.POST("/register", myRouter.userCtrl.Register)
		users.GET("/smtpstatus", auth.Authentication(auth.ADMIN, auth.OWNER), myRouter.userCtrl.SmtpStatus)
	}

	newPassword := myRouter.router.Group("/api")
	{
		newPassword.POST("/forgotPassword", myRouter.newPasswordCtrl.AddNewToken)
		newPassword.POST("/newPassword/:id", myRouter.newPasswordCtrl.UpdatePassword)
		newPassword.GET("/newPassword/:id", myRouter.newPasswordCtrl.ExistsWithIdAndValid)
	}

	articles := myRouter.router.Group("/api")
	{
		articles.POST("/article", auth.Authentication(auth.ADMIN, auth.OWNER), myRouter.articleCtrl.CreateArticle)
		articles.DELETE("/article/:id", auth.Authentication(auth.ADMIN, auth.OWNER), myRouter.articleCtrl.DeleteArticle)
		articles.GET("/articles", myRouter.articleCtrl.FindAllArticles)
		articles.PUT("/article", auth.Authentication(auth.ADMIN, auth.OWNER), myRouter.articleCtrl.UpdateArticle)
	}

	err := myRouter.router.Run(port)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("router startup error")
	}
}
