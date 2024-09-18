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
	res := ar.db.Table("articles").
		Joins("left join users on articles.user_id = users.id").
		Select("articles.id, articles.user_id, articles.title, articles.body, articles.create_at, users.username").
		Where("articles.id = ?", id).Scan(&article)
	if res.Error != nil {
		return nil, res.Error
	}
	// fmt.Println("res: ", res)
	return article, nil
}

func (ar *ArticleRepoDB) GetByUserID(user_id int) ([]*core.Article, error) {
	var articles []*core.Article
	// res := ar.db.Find(&article, "user_id = ?", user_id)
	res := ar.db.Table("articles").
		Joins("left join users on articles.user_id = users.id").
		Select("articles.id, articles.user_id, articles.title, articles.body, articles.create_at, users.username").
		Where("user_id = ?", user_id).Scan(&articles)
	if res.Error != nil {
		return nil, res.Error
	}
	return articles, nil
}

func (ar *ArticleRepoDB) GetAll() ([]*core.Article, error) {
	var articles []*core.Article
	// res := ar.db.Find(&article)
	res := ar.db.Table("articles").
		Joins("left join users on articles.user_id = users.id").
		Select("articles.id, articles.user_id, articles.title, articles.body, articles.create_at, users.username").
		Scan(&articles)
	fmt.Println("articles: ", articles[0])
	if res.Error != nil {
		return nil, res.Error
	}
	return articles, nil
}

func (ar *ArticleRepoDB) Create(article *core.Article) error {
	res := ar.db.Create(&article)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (ar *ArticleRepoDB) Delete(id int) error {
	res := ar.db.Delete(&core.Article{}, id)

	if res.Error != nil {
		return res.Error
	}
	return nil
}
