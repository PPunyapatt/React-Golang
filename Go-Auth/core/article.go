package core

import "time"

type Article struct {
	Id        int
	User_id   int
	Body      string
	Title     string
	Create_at time.Time
}

type ArticleResult struct {
	Id        int
	User_id   int
	Body      string
	Title     string
	Create_at time.Time
	Username  string
}

type ArticleRepository interface {
	GetByID(id int) (*ArticleResult, error)
	GetByUserID(user_id int) ([]*ArticleResult, error)
	GetAll() ([]*ArticleResult, error)
	Create(article *Article) error
	// Update(article *Article) error
	// Delete(id int) error
}

type ArticleService interface {
	GetPostByID(id int) (*ArticleResult, error)
	GetMyPost(user_id int) ([]*ArticleResult, error)
	GetAllPost() ([]*ArticleResult, error)
	CreatePost(article *Article) error
	// UpdatePost(article *Article) error
	// Delete(id int) error
}
