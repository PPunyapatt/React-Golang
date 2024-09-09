package controllers

import (
	"fmt"
	"goAuth/core"
	"net/http"

	"github.com/labstack/echo/v4"
)

type UserHandler struct {
	svc core.UserService
}

func NewUserHandler(svc core.UserService) *UserHandler {
	return &UserHandler{svc: svc}
}

func (uh *UserHandler) Register(c echo.Context) error {
	var u *core.User
	if err := c.Bind(&u); err != nil {
		fmt.Println("u: ", u)
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	if err := uh.svc.Register(u); err != nil {
		return echo.NewHTTPError(http.StatusConflict, err)
	}
	return c.JSON(http.StatusOK, echo.Map{
		"CreateUser": "Success",
	})
}
