package controllers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Admin() echo.HandlerFunc {
	return func(c echo.Context) error {
		fmt.Println("Admin")
		return c.String(http.StatusOK, "Hi, you have access!")
	}
}
