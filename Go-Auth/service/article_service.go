package service

import (
	"fmt"
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
	fmt.Println("allPost: ", allPost)
	if err != nil {
		return nil, err
	}
	return allPost, nil
}
