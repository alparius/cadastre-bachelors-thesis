package mongodb

import (
	"context"
	"kataszter-backend/store"
	"time"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const TIMEOUT = 5 * time.Second

type MongoStore struct {
	database *mongo.Database
}

// New returns a new MongoStore instance connected to the database.
func New(dbUrl string, dbName string) (*MongoStore, error) {
	clientOptions := options.Client().ApplyURI(dbUrl)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database connection error")
		return nil, err
	}
	database := client.Database(dbName)

	return &MongoStore{database}, nil
}

// GetPriestStore returns a PriestStore instance with a pointer to the Priests collection.
func (m *MongoStore) GetPriestStore() store.PriestStore {
	collection := m.database.Collection("Priests")
	return &PriestMongoStore{collection}
}

// GetParishStore returns a ParishStore instance with a pointer to the Parishes collection.
func (m *MongoStore) GetParishStore() store.ParishStore {
	collection := m.database.Collection("Parishes")
	return &ParishMongoStore{collection}
}

// GetUserStore returns a UserStore instance with a pointer to the Users collection.
func (m *MongoStore) GetUserStore() store.UserStore {
	collection := m.database.Collection("Users")
	return &UserMongoStore{collection}
}

// GetUserStore returns a UserStore instance with a pointer to the Users collection.
func (m *MongoStore) GetNewPasswordStore() store.NewPasswordStore {
	collection := m.database.Collection("NewPasswordTokens")
	return &NewPasswordMongoStore{collection}
}

// GetArticleStore returns an ArticleStore instance with a pointer to the Articles collection.
func (m *MongoStore) GetArticleStore() store.ArticleStore {
	collection := m.database.Collection("Articles")
	return &ArticleMongoStore{collection}
}
