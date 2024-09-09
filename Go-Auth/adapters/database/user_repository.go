package database

import (
	"fmt"
	"goAuth/core"

	"errors"

	"gorm.io/gorm"
)

type UserRepoDB struct {
	db *gorm.DB
}

func NewUserRepoDB(db *gorm.DB) *UserRepoDB {
	return &UserRepoDB{db: db}
}

func (u *UserRepoDB) GetUserName(username string) (*core.User, error) {
	var user *core.User
	res := u.db.Find(&user, "username = ?", username)
	if res.Error != nil {
		return user, res.Error
	}
	fmt.Println("raw password: ", user.Password)
	// hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 8)
	// user.Password = string(hashedPassword)
	fmt.Println("res: ", user)
	return user, nil
}

func (u *UserRepoDB) CreateUser(user *core.User) error {
	existingUser, err := u.GetUserName(user.Username)
	fmt.Println("existingUser: ", existingUser)
	if err == nil && existingUser.Username != "" {
		return errors.New("username already taken")
	}
	if err := u.db.Create(&user); err.Error != nil {
		return err.Error
	}
	return nil
}
