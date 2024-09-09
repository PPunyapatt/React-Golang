package core

type User struct {
	Id       int
	Username string
	Password string
	Role     string
}

type UserService interface {
	Register(user *User) error
}

type UserRepository interface {
	GetUserName(username string) (*User, error)
	CreateUser(user *User) error
}
