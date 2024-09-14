package controllers

import (
	"fmt"
	"goAuth/core"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
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
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(u.Password), 8)
	u.Password = string(hashedPassword)
	if err := uh.svc.Register(u); err != nil {
		return echo.NewHTTPError(http.StatusConflict, err)
	}
	return c.JSON(http.StatusOK, echo.Map{
		"CreateUser": "Success",
	})
}

func (ah *ArticleHandler) Logout(c echo.Context) error {
	cookie := new(http.Cookie)
	cookie.Name = "access-token"
	cookie.Value = ""
	cookie.Expires = time.Unix(0, 0)
	cookie.Path = "/"
	cookie.HttpOnly = true
	c.SetCookie(cookie)
	return nil
}
