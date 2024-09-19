package core

import "time"

type ArticleDB struct {
	Id        int
	User_id   int
	Body      string
	Title     string
	Create_at time.Time
	Username  string
}

type Article struct {
	Id        int       `gorm:"primaryKey;autoIncrement"`
	User_id   int       `gorm:"not null"`
	Body      string    `gorm:"type:text;not null"`
	Title     string    `gorm:"type:varchar(100);not null"`
	Create_at time.Time `gorm:"autoCreateTime"`
}

type ArticleRepository interface {
	GetByID(id int) (*ArticleDB, error)
	GetByUserID(user_id int) ([]*ArticleDB, error)
	GetAll() ([]*ArticleDB, error)
	Create(article *Article) error
	// Update(article *Article) error
	Delete(id int) error
}

type ArticleService interface {
	GetPostByID(id int) (*ArticleDB, error)
	GetMyPost(user_id int) ([]*ArticleDB, error)
	GetAllPost() ([]*ArticleDB, error)
	CreatePost(article *Article) error
	// UpdatePost(article *Article) error
	DeletePost(id int) error
}
