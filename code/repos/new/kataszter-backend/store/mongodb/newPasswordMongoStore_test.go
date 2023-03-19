package mongodb

import (
	"kataszter-backend/model"
	"kataszter-backend/store"
	"testing"

	"github.com/tj/assert"
)

func getNewPasswordStoreMock() store.NewPasswordStore {
	store, _ := New("mongodb://localhost:1", "bad_dbname")
	return store.GetNewPasswordStore()
}

func TestNewPasswordStoreFindByID(t *testing.T) {
	newPasswordStore := getNewPasswordStoreMock()
	newPasswordToken, err := newPasswordStore.FindByID("5d6385f3f250a816135d2000")
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, newPasswordToken, "should not return result object")
}

func TestNewPasswordStoreInsert(t *testing.T) {
	newPasswordStore := getNewPasswordStoreMock()
	newPasswordToken, err := newPasswordStore.Insert(&model.NewPasswordToken{})
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, newPasswordToken, "should not return result object")
}

func TestNewPasswordStoreInsertMany(t *testing.T) {
	newPasswordStore := getNewPasswordStoreMock()
	err := newPasswordStore.InsertMany(&[]model.NewPasswordToken{})
	assert.Error(t, err, "should return error (timeout)")
}

func TestNewPasswordStoreDeleteAll(t *testing.T) {
	newPasswordStore := getNewPasswordStoreMock()
	err := newPasswordStore.DeleteAll()
	assert.Error(t, err, "should return error (timeout)")
}
