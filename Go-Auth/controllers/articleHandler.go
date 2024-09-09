package controllers

import (
	"goAuth/core"
	"net/http"
	"strconv"

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
	articles, err := ah.svc.GetAllPost()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return echo.NewHTTPError(http.StatusOK, articles)
}
