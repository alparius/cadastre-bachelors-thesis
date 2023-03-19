package mongodb

import (
	"context"
	"kataszter-backend/model"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ArticleMongoStore struct {
	collection *mongo.Collection
}

// FindByID returns an Article with the given ID.
func (impl *ArticleMongoStore) FindByID(ID string) (*model.Article, error) {
	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("ObjectIDFromHex error")
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	var article model.Article
	err = impl.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&article)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return nil, err
	}

	return &article, nil
}

// FindAll fetches all Articles from the database.
func (impl *ArticleMongoStore) FindAll() (*[]model.Article, error) {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	cursor, err := impl.collection.Find(ctx, bson.M{})
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database find error")
		return nil, err
	}
	defer cursor.Close(ctx)

	var articles []model.Article
	for cursor.Next(ctx) {
		var n model.Article
		err = cursor.Decode(&n)
		if err != nil {
			logrus.WithField("error", err.Error()).Error("decode entity error")
			return nil, err
		}
		articles = append(articles, n)
	}

	logrus.WithField("length", len(articles)).Info("returning News")
	return &articles, nil
}

// Insert saves a new Article into the collection.
func (impl *ArticleMongoStore) Insert(article *model.Article) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	result, err := impl.collection.InsertOne(ctx, article)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database insertion error")
		return "", err
	}

	logrus.WithField("id", result.InsertedID).Info("inserted an Article")
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

// InsertMany saves an array of Articles into the collection.
func (impl *ArticleMongoStore) InsertMany(articles *[]model.Article) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	var documents []interface{}
	for _, article := range *articles {
		documents = append(documents, article)
	}

	result, err := impl.collection.InsertMany(ctx, documents)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database insertMany error")
		return err
	}

	logrus.WithField("insertCount", len(result.InsertedIDs)).Info("inserted an array of Articles")
	return nil
}

// Update updates an existing Article in the collection.
func (impl *ArticleMongoStore) Update(article *model.Article) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	result, err := impl.collection.ReplaceOne(ctx, bson.M{"_id": article.ID}, article)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database update error")
		return err
	}

	logrus.WithField("updateSize", result.MatchedCount).Info("updated n")
	return nil
}

// Delete removes an Article from the collection.
func (impl *ArticleMongoStore) Delete(ID string) error {
	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("ObjectIDFromHex error")
		return err
	}

	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	result, err := impl.collection.DeleteOne(ctx, bson.M{"_id": objectID})
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database delete error")
		return err
	}

	logrus.WithField("deleteCount", result.DeletedCount).Info("deleted an Article")
	return nil
}

// DeleteAll empties the Article collection.
func (impl *ArticleMongoStore) DeleteAll() error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	err := impl.collection.Drop(ctx)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database drop error")
		return err
	}

	logrus.Info("collection dropped successfully")
	return nil
}
