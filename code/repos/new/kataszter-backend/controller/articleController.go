package controller

import (
	"encoding/json"
	"kataszter-backend/model"
	"kataszter-backend/store"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type ArticleController struct {
	Store store.ArticleStore
}

// FindAllArticles returns all Articles.
func (ctrl *ArticleController) FindAllArticles(context *gin.Context) {
	articles, err := ctrl.Store.FindAll()
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("returning with error")
		return
	}

	if len(*articles) == 0 {
		context.AbortWithStatus(http.StatusNoContent)
		logrus.Info("returning without results")
		return
	}

	logrus.WithField("length", len(*articles)).Info("returning articles")
	context.JSON(http.StatusOK, articles)
}

// CreateArticle adds a new Article.
func (ctrl *ArticleController) CreateArticle(context *gin.Context) {
	var newArticle model.Article

	decoder := json.NewDecoder(context.Request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&newArticle)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"label": "error.request"})
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	newArticle.Date = time.Now().Format(time.RFC3339)

	_, err = ctrl.Store.Insert(&newArticle)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"label": "error.server"})
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	logrus.WithField("article", newArticle.ID).Info("new article created")
	context.JSON(http.StatusOK, nil)
}

// UpdateArticle updates an Article.
func (ctrl *ArticleController) UpdateArticle(context *gin.Context) {
	var article model.Article

	decoder := json.NewDecoder(context.Request.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&article)
	if err != nil {
		context.AbortWithStatus(http.StatusBadRequest)
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return
	}

	logrus.WithField("ID:", article.ID).Info("updating article")

	err = ctrl.Store.Update(&article)
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	logrus.WithField("ID:", article.ID).Info("updating was successful")
	context.JSON(http.StatusOK, nil)
}

// DeleteArticle deletes an Article.
func (ctrl *ArticleController) DeleteArticle(context *gin.Context) {
	id := context.Param("id")

	_, err := ctrl.Store.FindByID(id)
	if err != nil {
		context.JSON(http.StatusNotFound, nil)
		logrus.WithField("articleID", id).Error("article not found")
		return
	}

	err = ctrl.Store.Delete(id)
	if err != nil {
		context.AbortWithStatus(http.StatusInternalServerError)
		logrus.WithField("error", err.Error()).Error("database error")
		return
	}

	logrus.WithField("ID:", id).Info("deletion was successful")
	context.JSON(http.StatusOK, nil)
}
