package service

import (
	"goAuth/core"
)

type UserService struct {
	userRepo core.UserRepository
}

func NewUserService(userRepo core.UserRepository) *UserService {
	return &UserService{userRepo: userRepo}
}

func (us *UserService) Register(user *core.User) error {
	err := us.userRepo.CreateUser(user)
	if err != nil {
		return err
	}
	return nil
}
