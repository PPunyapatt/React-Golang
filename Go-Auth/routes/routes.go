package routes

import (
	"goAuth/adapters/jwt_tkn"
	"goAuth/controllers"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Setup(
	e *echo.Echo,
	authHandler controllers.AuthHandler,
	userHandler controllers.UserHandler,
	articleHandler controllers.ArticleHandler) {

	// e.Use(middleware.Logger())
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowCredentials: true,
	}))

	e.POST("/user/login", authHandler.Login)
	e.POST("/user/signup", userHandler.Register)

	// adminGroup := e.Group("/admin")
	user := e.Group("/user")
	config := echojwt.Config{
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(jwt_tkn.Claims)
		},
		SigningKey:  []byte(jwt_tkn.GetJWTSecret()),
		TokenLookup: "cookie:access-token",
	}
	user.Use(echojwt.WithConfig(config))

	// Auth and signup
	user.POST("/logout", authHandler.Logout)

	// Get article
	user.GET("/allpost", articleHandler.GetAllPost)
	user.GET("/mypost/:user_id", articleHandler.GetMyPost)
	user.GET("/getpost", articleHandler.GetPostByID)

	// Check token expire
	user.GET("/auth_check", func(c echo.Context) error {
		return c.String(http.StatusOK, "Token is valid")
	})
}
