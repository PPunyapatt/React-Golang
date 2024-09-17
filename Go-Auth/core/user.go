package core

type User struct {
	Id       int    `gorm:"primaryKey;autoIncrement"`
	Username string `gorm:"type:varchar(50);not null"`
	Password string `gorm:"type:varchar(100);not null"`
}

type UserService interface {
	Register(user *User) error
}

type UserRepository interface {
	GetUserName(username string) (*User, error)
	CreateUser(user *User) error
}
