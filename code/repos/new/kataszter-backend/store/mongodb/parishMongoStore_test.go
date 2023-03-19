package mongodb

import (
	"kataszter-backend/model"
	"kataszter-backend/store"
	"testing"

	"github.com/sirupsen/logrus"
	"github.com/tj/assert"
)

func getParishStoreMock() store.ParishStore {
	store, err := New("mongodb://localhost:1", "bad_dbname")
	if err != nil {
		logrus.Error(err)
	}
	return store.GetParishStore()
}

func TestParishStoreFindByID(t *testing.T) {
	parishStore := getParishStoreMock()
	result, err := parishStore.FindByID("5d6385f3f250a816135d1000")
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, result, "should not return result object")
}

func TestParishStoreGetByIDHexError(t *testing.T) {
	parishStore := getParishStoreMock()
	result, err := parishStore.FindByID("1234")
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, result, "should not return result object")
}

func TestParishStoreFindAllByFilter(t *testing.T) {
	parishStore := getParishStoreMock()
	list, err := parishStore.FindAllByFilter(map[string]string{})
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, list, "should not return result array")
}

func TestParishStoreInsert(t *testing.T) {
	parishStore := getParishStoreMock()
	_, err := parishStore.Insert(&model.Parish{})
	assert.Error(t, err, "should return error (timeout)")
}

func TestParishStoreInsertMany(t *testing.T) {
	parishStore := getParishStoreMock()
	err := parishStore.InsertMany(&[]model.Parish{})
	assert.Error(t, err, "should return error (timeout)")
}

func TestParishStoreUpdate(t *testing.T) {
	parishStore := getParishStoreMock()
	err := parishStore.Update(&model.Parish{})
	assert.Error(t, err, "should return error (timeout)")
}

func TestParishStoreDelete(t *testing.T) {
	parishStore := getParishStoreMock()
	err := parishStore.Delete("5d6385f3f250a816135d1000")
	assert.Error(t, err, "should return error (timeout)")
}

func TestParishStoreDeleteAll(t *testing.T) {
	parishStore := getParishStoreMock()
	err := parishStore.DeleteAll()
	assert.Error(t, err, "should return error (timeout)")
}

func TestParishStoreDeletePriestReferences(t *testing.T) {
	parishStore := getParishStoreMock()
	err := parishStore.DeletePriestReferences("5d6385f3f250a816135d1000")
	assert.Error(t, err, "should return error (timeout)")
}

func TestParishStoreInsertPlacement(t *testing.T) {
	parishStore := getParishStoreMock()
	err := parishStore.InsertPlacement("5d6385f3f250a816135d1000", model.ParishPlacement{}, "test")
	assert.Error(t, err, "should return error (timeout)")
}

func TestParishStoreDeletePlacement(t *testing.T) {
	parishStore := getParishStoreMock()
	err := parishStore.DeletePlacement("5d6385f3f250a816135d1000", model.ParishPlacement{}, "test")
	assert.Error(t, err, "should return error (timeout)")
}
