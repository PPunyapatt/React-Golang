package service

import (
	"goAuth/core"
)

type ArticleService struct {
	svc core.ArticleRepository
}

func NewArticleService(svc core.ArticleRepository) *ArticleService {
	return &ArticleService{svc: svc}
}

func (as *ArticleService) GetPostByID(id int) (*core.Article, error) {
	post, err := as.svc.GetByID(id)
	if err != nil {
		return nil, err
	}
	return post, err
}

func (as *ArticleService) GetMyPost(user_id int) ([]*core.Article, error) {
	myPost, err := as.svc.GetByUserID(user_id)
	if err != nil {
		return nil, err
	}
	return myPost, nil
}

func (as *ArticleService) GetAllPost() ([]*core.Article, error) {
	allPost, err := as.svc.GetAll()
	if err != nil {
		return nil, err
	}
	return allPost, nil
}

func (as *ArticleService) CreatePost(article *core.Article) error {
	err := as.svc.Create(article)
	if err != nil {
		return err
	}
	return nil
}
