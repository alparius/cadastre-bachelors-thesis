package store

type Store interface {
	GetPriestStore() PriestStore
	GetParishStore() ParishStore
	GetUserStore() UserStore
	GetNewPasswordStore() NewPasswordStore
	GetNewsFeedStore() ArticleStore
}
