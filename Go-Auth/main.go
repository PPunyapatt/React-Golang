package main

import (
	"goAuth/adapters/database"
	"goAuth/config"
	"goAuth/controllers"
	"goAuth/routes"
	"goAuth/service"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	config.DatabaseInit()

	// User
	userRepo := database.NewUserRepoDB(config.DB())
	userService := service.NewUserService(userRepo)
	userHandler := controllers.NewUserHandler(userService)

	// Auth
	authService := service.NewAuthService(userRepo)
	authHandler := controllers.NewAuthHandler(authService)

	// Post
	articleRepo := database.NewArticleRepoDB(config.DB())
	articleService := service.NewArticleService(articleRepo)
	articleHandler := controllers.NewAritcleHandler(articleService)

	routes.Setup(
		e,
		*authHandler,
		*userHandler,
		*articleHandler)

	// Starting the server
	e.Logger.Fatal(e.Start(":8777"))
}
