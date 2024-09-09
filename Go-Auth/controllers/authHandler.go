package controllers

import (
	"fmt"
	"goAuth/core"
	"net/http"

	"github.com/labstack/echo/v4"
)

type AuthHandler struct {
	svc core.AuthService
}

func NewAuthHandler(svc core.AuthService) *AuthHandler {
	return &AuthHandler{svc: svc}
}

func (ah *AuthHandler) Login(c echo.Context) error {
	var u *core.User
	if err := c.Bind(&u); err != nil {
		fmt.Println("u: ", u)
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	err := ah.svc.Login(c, u)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, err)
	}
	return c.JSON(http.StatusOK, echo.Map{
		"Login": "Success",
	})
}

func (ah *AuthHandler) Logout(c echo.Context) error {
	if err := ah.Logout(c); err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, err)
	}
	return nil
}
