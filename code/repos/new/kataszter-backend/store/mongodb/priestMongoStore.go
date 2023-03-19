package mongodb

import (
	"context"
	"kataszter-backend/model"
	"regexp"
	"strconv"
	"strings"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PriestMongoStore struct {
	collection *mongo.Collection
}

// FindByID returns a priest with the given ID.
func (impl *PriestMongoStore) FindByID(ID string) (*model.Priest, error) {
	objectID, err := primitive.ObjectIDFromHex(ID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("ObjectIDFromHex error")
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	var priest model.Priest
	err = impl.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&priest)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("decode entity error")
		return nil, err
	}

	return &priest, nil
}

// FindAllByFilter makes a database fetch with the given dictionary of filter options.
func (impl *PriestMongoStore) FindAllByFilter(filters map[string]string) (*[]model.Priest, error) {
	filter := bson.D{}
	for key, value := range filters {
		var newFilter bson.E
		if key == "placement" {
			escapedValue := regexp.QuoteMeta(value)
			newFilter = bson.E{Key: "$or", Value: bson.A{
				bson.D{{Key: "assistantPriestPlaces.place", Value: primitive.Regex{Pattern: escapedValue, Options: "i"}}},
				bson.D{{Key: "mainPriestPlaces.place", Value: primitive.Regex{Pattern: escapedValue, Options: "i"}}},
			}}
		} else if key == "area" {
			escapedValue := regexp.QuoteMeta(value)
			newFilter = bson.E{Key: "$or", Value: bson.A{
				bson.D{{Key: "birthCountry", Value: primitive.Regex{Pattern: escapedValue, Options: "i"}}},
				bson.D{{Key: "birthCounty", Value: primitive.Regex{Pattern: escapedValue, Options: "i"}}},
				bson.D{{Key: "diocese", Value: primitive.Regex{Pattern: escapedValue, Options: "i"}}},
			}}
		} else if strings.Contains(key, "End") || strings.Contains(key, "Start") {
			nrValue, err := strconv.Atoi(value)
			if err != nil {
				continue
			}
			if key == "activeStart" {
				newFilter = bson.E{Key: "$or", Value: bson.A{
					bson.D{{Key: "assistantPriestPlaces.startDate.year", Value: bson.D{{Key: "$gte", Value: nrValue}}}},
					bson.D{{Key: "mainPriestPlaces..startDate.year", Value: bson.D{{Key: "$gte", Value: nrValue}}}},
				}}
			} else if key == "activeEnd" {
				newFilter = bson.E{Key: "$or", Value: bson.A{
					bson.D{{Key: "assistantPriestPlaces.endDate.year", Value: bson.D{{Key: "$lte", Value: nrValue}}}},
					bson.D{{Key: "mainPriestPlaces.endDate.year", Value: bson.D{{Key: "$lte", Value: nrValue}}}},
				}}
			} else if key == "birthStart" {
				newFilter = bson.E{Key: "birthDate.year", Value: bson.D{{Key: "$gte", Value: nrValue}}}
			} else if key == "birthEnd" {
				newFilter = bson.E{Key: "birthDate.year", Value: bson.D{{Key: "$lte", Value: nrValue}}}
			} else if key == "deathStart" {
				newFilter = bson.E{Key: "deathDate.year", Value: bson.D{{Key: "$gte", Value: nrValue}}}
			} else if key == "deathEnd" {
				newFilter = bson.E{Key: "deathDate.year", Value: bson.D{{Key: "$lte", Value: nrValue}}}
			} else if key == "subscriptionStart" {
				newFilter = bson.E{Key: "subscriptionDate.year", Value: bson.D{{Key: "$gte", Value: nrValue}}}
			} else if key == "subscriptionEnd" {
				newFilter = bson.E{Key: "subscriptionDate.year", Value: bson.D{{Key: "$lte", Value: nrValue}}}
			} else if key == "graduationStart" {
				newFilter = bson.E{Key: "graduationDate.year", Value: bson.D{{Key: "$gte", Value: nrValue}}}
			} else if key == "graduationEnd" {
				newFilter = bson.E{Key: "graduationDate.year", Value: bson.D{{Key: "$lte", Value: nrValue}}}
			}
		} else {
			escapedValue := regexp.QuoteMeta(value)
			newFilter = bson.E{Key: key, Value: primitive.Regex{Pattern: escapedValue, Options: "i"}}
		}
		filter = append(filter, newFilter)
	}

	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	cursor, err := impl.collection.Find(ctx, filter)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database find error")
		return nil, err
	}
	defer cursor.Close(ctx)

	var priests []model.Priest
	for cursor.Next(ctx) {
		var p model.Priest
		err = cursor.Decode(&p)
		if err != nil {
			logrus.WithField("error", err.Error()).Error("decode entity error")
			return nil, err
		}
		priests = append(priests, p)
	}

	logrus.WithField("length", len(priests)).Info("returning Priests")
	return &priests, nil
}

// Insert saves a new Priest into the collection.
func (impl *PriestMongoStore) Insert(priest *model.Priest) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	result, err := impl.collection.InsertOne(ctx, priest)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database insertion error")
		return "", err
	}

	logrus.WithField("id", result.InsertedID).Info("inserted a Priest")
	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

// InsertMany saves an array of Priests into the collection.
func (impl *PriestMongoStore) InsertMany(priests *[]model.Priest) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	var documents []interface{}
	for _, priest := range *priests {
		documents = append(documents, priest)
	}

	result, err := impl.collection.InsertMany(ctx, documents)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database insertMany error")
		return err
	}

	logrus.WithField("insertCount", len(result.InsertedIDs)).Info("inserted an array of Priests")
	return nil
}

// Update updates an existing Priest in the collection.
func (impl *PriestMongoStore) Update(priest *model.Priest) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	result, err := impl.collection.ReplaceOne(ctx, bson.M{"_id": priest.ID}, priest)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("database update error")
		return err
	}

	logrus.WithField("updateCount", result.ModifiedCount).Info("updated a Priest")
	return nil
}

// DeleteAll empties the collection.
func (impl *PriestMongoStore) DeleteAll() error {
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

// UpdatePlacementLocation updates priests with the new placement location.
func (impl *PriestMongoStore) UpdatePlacementLocation(parishID string, parishName string) error {
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()

	parishObjectID, err := primitive.ObjectIDFromHex(parishID)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("ObjectIDFromHex error")
		return err
	}

	opts := options.Update().SetArrayFilters(options.ArrayFilters{
		Filters: []interface{}{bson.M{"elem.placeID": parishObjectID}},
	})

	filter := bson.M{"assistantPriestPlaces": bson.M{"$exists": true}}
	change := bson.M{"$set": bson.M{"assistantPriestPlaces.$[elem].place": parishName}}
	result, err := impl.collection.UpdateMany(ctx, filter, change, opts)

	if err != nil {
		logrus.WithField("error", err.Error()).Error("database update error")
		return err
	}

	logrus.WithField("updateSize", result.MatchedCount).Info("updated assistantPriestPlaces from Priests")

	filter = bson.M{"mainPriestPlaces": bson.M{"$exists": true}}
	change = bson.M{"$set": bson.M{"mainPriestPlaces.$[elem].place": parishName}}
	result, err = impl.collection.UpdateMany(ctx, filter, change, opts)

	if err != nil {
		logrus.WithField("error", err.Error()).Error("database update error")
		return err
	}

	logrus.WithField("updateSize", result.MatchedCount).Info("updated mainPriestPlaces from Priests")

	return nil
}

// Delete deletes a Priest from the collection.
func (impl *PriestMongoStore) Delete(ID string) error {
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

	logrus.WithField("deleteCount", result.DeletedCount).Info("deleted one Priest")
	return nil
}
