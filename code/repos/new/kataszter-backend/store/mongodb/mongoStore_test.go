package mongodb

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNew(t *testing.T) {
	store, err := New("bad_url", "bad_dbname")
	assert.Error(t, err, "should have error message")
	assert.Nil(t, store, "store should be nil")
}

func TestGetPriestStore(t *testing.T) {
	store, err := New("mongodb://localhost:1", "bad_dbname")
	assert.NoError(t, err, "should create connection")
	pStore := store.GetPriestStore()
	assert.NotNil(t, pStore, "pStore should not be nil")
}

func TestGetParishStore(t *testing.T) {
	store, err := New("mongodb://localhost:1", "bad_dbname")
	assert.NoError(t, err, "should create connection")
	pStore := store.GetParishStore()
	assert.NotNil(t, pStore, "pStore should not be nil")
}
