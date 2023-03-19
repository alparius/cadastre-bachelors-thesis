package mongodb

import (
	"kataszter-backend/model"
	"kataszter-backend/store"
	"testing"

	"github.com/tj/assert"
)

func getUserStoreMock() store.UserStore {
	store, _ := New("mongodb://localhost:1", "bad_dbname")
	return store.GetUserStore()
}

func TestUserStoreFindByID(t *testing.T) {
	userStore := getUserStoreMock()
	user, err := userStore.FindByID("5d6385f3f250a816135d2000")
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, user, "should not return result object")
}

func TestUserStoreGetByIDHexError(t *testing.T) {
	userStore := getUserStoreMock()
	result, err := userStore.FindByID("1234")
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, result, "should not return result object")
}

func TestUserStoreFindByEmail(t *testing.T) {
	userStore := getUserStoreMock()
	user, err := userStore.FindByEmail("email")
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, user, "should return nil")
}

func TestUserStoreFindAll(t *testing.T) {
	userStore := getUserStoreMock()
	list, err := userStore.FindAll()
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, list, "should not return result array")
}

func TestUserStoreGetAdminMails(t *testing.T) {
	userStore := getUserStoreMock()
	list, err := userStore.GetAdminMails()
	assert.Error(t, err, "should return error (timeout)")
	assert.Nil(t, list, "should not return result array")
}

func TestUserStoreInsert(t *testing.T) {
	userStore := getUserStoreMock()
	err := userStore.Insert(&model.User{})
	assert.Error(t, err, "should return error (timeout)")
}

func TestUserStoreInsertMany(t *testing.T) {
	userStore := getUserStoreMock()
	err := userStore.InsertMany(&[]model.User{})
	assert.Error(t, err, "should return error (timeout)")
}

func TestUserStoreUpdate(t *testing.T) {
	userStore := getUserStoreMock()
	err := userStore.Update(&model.User{})
	assert.Error(t, err, "should return error (timeout)")
}

func TestUserStoreDelete(t *testing.T) {
	userStore := getUserStoreMock()
	err := userStore.Delete("5d6385f3f250a816135d2000")
	assert.Error(t, err, "should return error (timeout)")
}

func TestUserStoreDeleteAll(t *testing.T) {
	userStore := getUserStoreMock()
	err := userStore.DeleteAll()
	assert.Error(t, err, "should return error (timeout)")
}
