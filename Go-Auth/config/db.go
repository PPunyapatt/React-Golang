package config

import (
	// "fmt"
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var database *gorm.DB
var e error

func DatabaseInit() {

	database, e = gorm.Open(mysql.Open("root:test@tcp(127.0.0.1:4444)/banking?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{})

	if e != nil {
		fmt.Println("Error")
	} else {
		fmt.Println("Success")
	}
}

func DB() *gorm.DB {
	return database
}
