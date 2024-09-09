package core

type Article struct {
	id        int
	user_id   int
	body      string
	title     string
	create_at string
}

type ArticleRepository interface {
	GetByID(id int) (*Article, error)
	GetByUserID(user_id int) ([]*Article, error)
	GetAll() ([]*Article, error)
	// Create(article *Article) error
	// Update(article *Article) error
	// Delete(id int) error
}

type ArticleService interface {
	GetPostByID(id int) (*Article, error)
	GetMyPost(user_id int) ([]*Article, error)
	GetAllPost() ([]*Article, error)
	// CreatePost(article *Article) error
	// UpdatePost(article *Article) error
	// Delete(id int) error
}
