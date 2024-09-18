package controllers

import (
	"goAuth/core"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

type ArticleHandler struct {
	svc core.ArticleService
}

func NewAritcleHandler(svc core.ArticleService) *ArticleHandler {
	return &ArticleHandler{svc: svc}
}

func (ah *ArticleHandler) GetPostByID(c echo.Context) error {
	num := c.Param("id")
	id, err := strconv.Atoi(num)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	article, err := ah.svc.GetPostByID(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return echo.NewHTTPError(http.StatusOK, article)
}

func (ah *ArticleHandler) GetMyPost(c echo.Context) error {
	num := c.Param("user_id")
	user_id, err := strconv.Atoi(num)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	articles, err := ah.svc.GetMyPost(user_id)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return echo.NewHTTPError(http.StatusOK, articles)
}

func (ah *ArticleHandler) GetAllPost(c echo.Context) error {
	article, err := ah.svc.GetAllPost()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return echo.NewHTTPError(http.StatusOK, article)
}

func (ah *ArticleHandler) CreatePost(c echo.Context) error {
	var article *core.Article
	if err := c.Bind(&article); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}
	article.Create_at = time.Now()

	err := ah.svc.CreatePost(article)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}
	return nil
}

func (ah *ArticleHandler) DeletePost(c echo.Context) error {
	num := c.Param("id")
	id, err := strconv.Atoi(num)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	err_del := ah.svc.DeletePost(id)
	if err_del != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return nil
}
