package service

import (
	"fmt"
	"goAuth/adapters/jwt_tkn"
	"goAuth/core"
	"net/http"
	"time"

	"errors"

	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepo core.UserRepository
}

func NewAuthService(userRepo core.UserRepository) *AuthService {
	return &AuthService{userRepo: userRepo}
}

func (svc *AuthService) Login(c echo.Context, u *core.User) (*core.User, error) {

	user, err := svc.userRepo.GetUserName(u.Username)
	if err != nil {
		return nil, err
	}

	// Validate username and password
	fmt.Println("u.Username: ", u.Username, "\nuser.Ussername: ", user.Username)
	if u.Username != user.Username {
		return nil, errors.New("username is invalid")
	}

	fmt.Println("u.Password: ", u.Password, "\nuser.password: ", user.Password)
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(u.Password)); err != nil {
		return nil, errors.New("password is invalid")
	}

	err_tkn := jwt_tkn.GenerateTokensAndSetCookies(user, c)
	if err_tkn != nil {
		return nil, echo.NewHTTPError(http.StatusUnauthorized, err_tkn)
	}

	return user, nil
}

func (svc *AuthService) Logout(c echo.Context) error {
	cookie := new(http.Cookie)
	cookie.Name = "access-token"
	cookie.Value = ""
	cookie.Expires = time.Unix(0, 0)
	cookie.Path = "/"
	cookie.HttpOnly = true
	c.SetCookie(cookie)
	return nil
}
