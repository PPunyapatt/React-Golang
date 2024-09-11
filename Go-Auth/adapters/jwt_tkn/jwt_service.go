package jwt_tkn

import (
	"fmt"
	"goAuth/core"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

const (
	accessTokenCookieName  = "access-token"
	refreshTokenCookieName = "refresh-token"
	jwtSecretKey           = "test"
	jwtRefreshSecretKey    = "some-refresh-secret-key"
)

type Claims struct {
	Name string
	jwt.RegisteredClaims
}

func GetJWTSecret() string {
	return jwtSecretKey
}

func GenerateTokensAndSetCookies(user *core.User, c echo.Context) error {
	accessToken, exp, err := generateAccessToken(user)
	if err != nil {
		return err
	}

	setTokenCookie(accessTokenCookieName, accessToken, exp, c)
	setUserCookie(user, exp, c)

	return nil
}

func generateAccessToken(user *core.User) (string, time.Time, error) {
	expirationTime := time.Now().Add(5 * time.Second)
	return generateToken(user, expirationTime, []byte(GetJWTSecret()))
}

func generateToken(user *core.User, exp time.Time, secret []byte) (string, time.Time, error) {
	claims := &Claims{
		Name: user.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(exp),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(secret)

	fmt.Println("token: ", tokenString)
	if err != nil {
		return "", time.Now(), err
	}

	return tokenString, exp, nil
}

func setTokenCookie(name, token string, expiration time.Time, c echo.Context) {
	cookie := new(http.Cookie)
	cookie.Name = name
	cookie.Value = token
	cookie.Expires = expiration
	cookie.Path = "/"
	// Http-only helps mitigate the risk of client side script accessing the protected cookie.
	cookie.HttpOnly = true
	c.SetCookie(cookie)
}

func setUserCookie(user *core.User, expiration time.Time, c echo.Context) {
	cookie := new(http.Cookie)
	cookie.Name = "user"
	cookie.Value = user.Username
	cookie.Expires = expiration
	cookie.Path = "/"
	c.SetCookie(cookie)
}
