package mongodb

import (
	"context"
	"kataszter-backend/model"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserMongoStore struct {
	collection *mongo.Collection
}

// FindByID returns a User with the given ID.
func (impl *UserMongoStore) FindByID(ID string) (*model.User, error) {
	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("ObjectIDFromHex error")
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	var user model.User
	err = impl.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return nil, err
	}

	return &user, nil
}

// FindByEmail returns a User with the given email.
func (impl *UserMongoStore) FindByEmail(email string) (*model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	var user model.User
	filter := bson.D{primitive.E{Key: "email", Value: primitive.Regex{Pattern: "^" + email + "$", Options: "i"}}}
	err := impl.collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return nil, err
	}

	return &user, nil
}

// FindAll fetches all Users from the database.
func (impl *UserMongoStore) FindAll() (*[]model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	cursor, err := impl.collection.Find(ctx, bson.M{})
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database find error")
		return nil, err
	}
	defer cursor.Close(ctx)

	var users []model.User
	for cursor.Next(ctx) {
		var u model.User
		err = cursor.Decode(&u)
		if err != nil {
			logrus.WithField("error", err.Error()).Error("decode entity error")
			return nil, err
		}
		users = append(users, u)
	}

	logrus.WithField("length", len(users)).Info("returning Users")
	return &users, nil
}

// GetAdminMails gets the list of admin email addresses
func (impl *UserMongoStore) GetAdminMails() ([]string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	filter := bson.D{bson.E{Key: "$or", Value: bson.A{
		bson.D{{Key: "role", Value: "admin"}},
		bson.D{{Key: "role", Value: "owner"}},
	}}}
	cursor, err := impl.collection.Find(ctx, filter)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database find error")
		return nil, err
	}
	defer cursor.Close(ctx)

	var addresses []string
	for cursor.Next(ctx) {
		var u model.User
		err = cursor.Decode(&u)
		if err != nil {
			logrus.WithField("error", err.Error()).Error("decode entity error")
			return nil, err
		}
		addresses = append(addresses, u.Email)
	}

	logrus.WithField("length", len(addresses)).Info("returning admin emails")
	return addresses, nil
}

// Insert saves a User into the collection.
func (impl *UserMongoStore) Insert(user *model.User) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	result, err := impl.collection.InsertOne(ctx, user)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database insertion error")
		return err
	}

	logrus.WithField("id", result.InsertedID).Info("inserted a User")
	return nil
}

// InsertMany saves an array of Users into the collection.
func (impl *UserMongoStore) InsertMany(users *[]model.User) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	var documents []interface{}
	for _, user := range *users {
		documents = append(documents, user)
	}

	result, err := impl.collection.InsertMany(ctx, documents)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database insertMany error")
		return err
	}

	logrus.WithField("insertCount", len(result.InsertedIDs)).Info("inserted an array of Users")
	return nil
}

// Update updates an existing User in the collection.
func (impl *UserMongoStore) Update(user *model.User) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	result, err := impl.collection.ReplaceOne(ctx, bson.M{"_id": user.ID}, user)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database update error")
		return err
	}

	logrus.WithField("updateCount", result.ModifiedCount).Info("updated a User")
	return nil
}

// Delete removes a User from the collection.
func (impl *UserMongoStore) Delete(ID string) error {
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

	logrus.WithField("deleteCount", result.DeletedCount).Info("deleted a User")
	return nil
}

// DeleteAll empties the Users collection.
func (impl *UserMongoStore) DeleteAll() error {
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
