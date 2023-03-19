package mongodb

import (
	"kataszter-backend/model"
	"kataszter-backend/store"
	"testing"

	"github.com/sirupsen/logrus"
	"github.com/tj/assert"
)

func getPriestStoreMock() store.PriestStore {
	store, err := New("mongodb://localhost:1", "bad_dbname")
	if err != nil {
		logrus.Error(err)
	}
	return store.GetPriestStore()
}

func TestPriestStoreFindByID(t *testing.T) {
	priestStore := getPriestStoreMock()
	result, err := priestStore.FindByID("5d6385f3f250a816135d1000")
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, result, "should not return result object")
}

func TestPriestStoreGetByIDHexError(t *testing.T) {
	priestStore := getPriestStoreMock()
	result, err := priestStore.FindByID("1234")
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, result, "should not return result object")
}

func TestPriestStoreFindAllByFilter(t *testing.T) {
	priestStore := getPriestStoreMock()
	list, err := priestStore.FindAllByFilter(map[string]string{})
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, list, "should not return result array")
}

func TestPriestStoreInsert(t *testing.T) {
	priestStore := getPriestStoreMock()
	_, err := priestStore.Insert(&model.Priest{})
	assert.Error(t, err, "should return error (timeout)")
}

func TestPriestStoreInsertMany(t *testing.T) {
	priestStore := getPriestStoreMock()
	err := priestStore.InsertMany(&[]model.Priest{})
	assert.Error(t, err, "should return error (timeout)")
}

func TestPriestStoreUpdate(t *testing.T) {
	priestStore := getPriestStoreMock()
	err := priestStore.Update(&model.Priest{})
	assert.Error(t, err, "should return error (timeout)")
}

func TestPriestStoreDelete(t *testing.T) {
	priestStore := getPriestStoreMock()
	err := priestStore.Delete("5d6385f3f250a816135d1000")
	assert.Error(t, err, "should return error (timeout)")
}

func TestPriestStoreDeleteAll(t *testing.T) {
	priestStore := getPriestStoreMock()
	err := priestStore.DeleteAll()
	assert.Error(t, err, "should return error (timeout)")
}
