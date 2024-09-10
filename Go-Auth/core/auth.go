package core

import (
	"github.com/labstack/echo/v4"
)

type AuthService interface {
	Login(c echo.Context, user *User) (*User, error)
	Logout(c echo.Context) error
}
