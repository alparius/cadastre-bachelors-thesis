package mongodb

import (
	"context"
	"kataszter-backend/model"
	"regexp"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ParishMongoStore struct {
	collection *mongo.Collection
}

// FindByID returns a Parish with the given ID.
func (impl *ParishMongoStore) FindByID(ID string) (*model.Parish, error) {
	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("ObjectIDFromHex error")
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	var parish model.Parish
	err = impl.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&parish)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return nil, err
	}

	return &parish, nil
}

// FindAllByFilter makes a database fetch with the given dictionary of filter options.
func (impl *ParishMongoStore) FindAllByFilter(filters map[string]string) (*[]model.Parish, error) {
	filter := bson.D{}
	for key, value := range filters {
		escapedValue := regexp.QuoteMeta(value)
		filter = append(filter, bson.E{Key: key, Value: primitive.Regex{Pattern: escapedValue, Options: "i"}})
	}

	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	cursor, err := impl.collection.Find(ctx, filter)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database find error")
		return nil, err
	}
	defer cursor.Close(ctx)

	var parishes []model.Parish
	for cursor.Next(ctx) {
		var p model.Parish
		err = cursor.Decode(&p)
		if err != nil {
			logrus.WithField("error", err.Error()).Error("decode entity error")
			return nil, err
		}
		parishes = append(parishes, p)
	}

	logrus.WithField("length", len(parishes)).Info("returning Parishes")
	return &parishes, nil
}

// Insert saves a new Parish into the collection.
func (impl *ParishMongoStore) Insert(parish *model.Parish) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	result, err := impl.collection.InsertOne(ctx, parish)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database insertion error")
		return "", err
	}

	logrus.WithField("id", result.InsertedID).Info("inserted a Parish")
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

// InsertMany saves an array of Parishes into the collection.
func (impl *ParishMongoStore) InsertMany(parishes *[]model.Parish) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	var documents []interface{}
	for _, parish := range *parishes {
		documents = append(documents, parish)
	}

	result, err := impl.collection.InsertMany(ctx, documents)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database insertMany error")
		return err
	}

	logrus.WithField("insertCount", len(result.InsertedIDs)).Info("inserted an array of Parishes")
	return nil
}

// Update updates an existing Parish in the collection.
func (impl *ParishMongoStore) Update(parish *model.Parish) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	result, err := impl.collection.ReplaceOne(ctx, bson.M{"_id": parish.ID}, parish)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database update error")
		return err
	}

	logrus.WithField("updateSize", result.MatchedCount).Info("updated a Parish")
	return nil
}

// Delete deletes a Parish from the collection.
func (impl *ParishMongoStore) Delete(ID string) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("ObjectIDFromHex error")
		return err
	}

	result, err := impl.collection.DeleteOne(ctx, bson.M{"_id": objectID})
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database delete error")
		return err
	}

	logrus.WithField("deleteCount", result.DeletedCount).Info("deleted one Parish")
	return nil
}

// DeleteAll empties the Parish collection.
func (impl *ParishMongoStore) DeleteAll() error {
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

// DeletePriestReferences deletes priest references from the Parish collection.
func (impl *ParishMongoStore) DeletePriestReferences(ID string) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("ObjectIDFromHex error")
		return err
	}

	change := bson.M{"$pull": bson.M{"mainPriests": bson.M{"priestID": objectID}}}
	result, err := impl.collection.UpdateMany(ctx, bson.M{}, change)
	logrus.WithField("updateSize", result.MatchedCount).Info("updated mainPriests from Parishes")

	if err != nil {
		logrus.WithField("error", err.Error()).Error("database update error")
		return err
	}

	change = bson.M{"$pull": bson.M{"assistantPriests": bson.M{"priestID": objectID}}}
	result, err = impl.collection.UpdateMany(ctx, bson.M{}, change)
	logrus.WithField("updateSize", result.MatchedCount).Info("updated assistantPriests from Parishes")

	if err != nil {
		logrus.WithField("error", err.Error()).Error("database update error")
		return err
	}

	return nil
}

// InsertPlacement inserts a ParishPlacement in the collection.
func (impl *ParishMongoStore) InsertPlacement(ID string, placement model.ParishPlacement, where string) error {
	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("ObjectIDFromHex error")
		return err
	}

	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	change := bson.M{"$push": bson.M{where: placement}}
	result, err := impl.collection.UpdateOne(ctx, bson.M{"_id": objectID}, change)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database update error")
		return err
	}

	logrus.WithField("count", result.ModifiedCount).Info("parish placement inserted")
	return nil
}

// DeletePlacement deletes a ParishPlacement in the collection.
func (impl *ParishMongoStore) DeletePlacement(ID string, placement model.ParishPlacement, where string) error {
	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("ObjectIDFromHex error")
		return err
	}

	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	change := bson.M{"$pull": bson.M{where: bson.M{"_id": placement.ID}}}
	result, err := impl.collection.UpdateOne(ctx, bson.M{"_id": objectID}, change)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database update error")
		return err
	}

	logrus.WithField("count", result.ModifiedCount).Info("parish placement deleted")
	return nil
}
