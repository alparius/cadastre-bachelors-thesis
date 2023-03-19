package mongodb

import (
	"context"
	"kataszter-backend/model"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type NewPasswordMongoStore struct {
	collection *mongo.Collection
}

// FindByID returns a Token with the given ID.
func (impl *NewPasswordMongoStore) FindByID(ID string) (*model.NewPasswordToken, error) {
	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("ObjectIDFromHex error")
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	var newPasswordToken model.NewPasswordToken
	err = impl.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&newPasswordToken)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return nil, err
	}

	return &newPasswordToken, nil
}

// Insert saves a Token into the collection.
func (impl *NewPasswordMongoStore) Insert(newPasswordToken *model.NewPasswordToken) (*string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	result, err := impl.collection.InsertOne(ctx, newPasswordToken)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database insertion error")
		return nil, err
	}

	logrus.WithField("id", result.InsertedID).Info("inserted a Token for Forgot Password")
	objectID := result.InsertedID.(primitive.ObjectID).Hex()
	return &objectID, nil
}

// InsertMany saves an array of NewPassword into the collection.
func (impl *NewPasswordMongoStore) InsertMany(newPasswordTokens *[]model.NewPasswordToken) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	var documents []interface{}
	for _, newPassword := range *newPasswordTokens {
		documents = append(documents, newPassword)
	}

	result, err := impl.collection.InsertMany(ctx, documents)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database insertMany error")
		return err
	}

	logrus.WithField("insertCount", len(result.InsertedIDs)).Info("inserted an array of newPasswords")
	return nil
}

// DeleteAll empties the Token collection.
func (impl *NewPasswordMongoStore) DeleteAll() error {
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
