package core

import "time"

type Article struct {
	Id        int
	User_id   int
	Body      string
	Title     string
	Create_at time.Time
}

type ArticleRepository interface {
	GetByID(id int) (*Article, error)
	GetByUserID(user_id int) ([]*Article, error)
	GetAll() ([]*Article, error)
	Create(article *Article) error
	// Update(article *Article) error
	// Delete(id int) error
}

type ArticleService interface {
	GetPostByID(id int) (*Article, error)
	GetMyPost(user_id int) ([]*Article, error)
	GetAllPost() ([]*Article, error)
	CreatePost(article *Article) error
	// UpdatePost(article *Article) error
	// Delete(id int) error
}
