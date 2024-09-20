package config

import (
	// "fmt"
	"fmt"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var database *gorm.DB
var e error

func DatabaseInit() {

	for retries := 5; retries > 0; retries-- {
		database, e = gorm.Open(mysql.Open("root:test@tcp(mysql-db:3306)/banking?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{})

		if e != nil {
			fmt.Println("Error", e.Error())
		} else {
			fmt.Println("Success")
			return
		}
		time.Sleep(10 * time.Second)
	}

}

func AutoMigtare(model interface{}) {
	database.AutoMigrate(model)
}

func DB() *gorm.DB {
	return database
}
