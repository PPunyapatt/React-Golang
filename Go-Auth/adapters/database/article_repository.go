package database

import (
	"fmt"
	"goAuth/core"

	"gorm.io/gorm"
)

type ArticleRepoDB struct {
	db *gorm.DB
}

func NewArticleRepoDB(db *gorm.DB) *ArticleRepoDB {
	return &ArticleRepoDB{db: db}
}

func (ar *ArticleRepoDB) GetByID(id int) (*core.Article, error) {
	var article *core.Article
	res := ar.db.Find(&article, "id = ?", id)
	if res.Error != nil {
		return nil, res.Error
	}
	fmt.Println("res: ", res)
	return article, nil
}

func (ar *ArticleRepoDB) GetByUserID(user_id int) ([]*core.Article, error) {
	var article []*core.Article
	res := ar.db.Find(&article, "user_id = ?", user_id)
	if res.Error != nil {
		return nil, res.Error
	}
	return article, nil
}

func (ar *ArticleRepoDB) GetAll() ([]*core.Article, error) {
	var article []*core.Article
	res := ar.db.Find(&article)
	if res.Error != nil {
		return nil, res.Error
	}
	return article, nil
}

func (ar *ArticleRepoDB) Create(article *core.Article) error {
	res := ar.db.Create(&article)
	if res.Error != nil {
		return res.Error
	}
	return nil
}
