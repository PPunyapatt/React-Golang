package database

import (
	"goAuth/core"

	"gorm.io/gorm"
)

type ArticleRepoDB struct {
	db *gorm.DB
}

func NewArticleRepoDB(db *gorm.DB) *ArticleRepoDB {
	return &ArticleRepoDB{db: db}
}

func (ar *ArticleRepoDB) GetByID(id int) (*core.ArticleResult, error) {
	var article *core.ArticleResult
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

func (ar *ArticleRepoDB) GetByUserID(user_id int) ([]*core.ArticleResult, error) {
	var articles []*core.ArticleResult
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

func (ar *ArticleRepoDB) GetAll() ([]*core.ArticleResult, error) {
	var articles []*core.ArticleResult
	// res := ar.db.Find(&article)
	res := ar.db.Table("articles").
		Joins("left join users on articles.user_id = users.id").
		Select("articles.id, articles.user_id, articles.title, articles.body, articles.create_at, users.username").
		Scan(&articles)
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
