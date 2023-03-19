#!/bin/bash

rm -f coverage.txt
echo 'mode: atomic' > coverage.txt

for d in $(go list ./... | grep -v testing); do
    go test -v -p 1 -race -covermode=atomic -coverprofile=coverage.out -coverpkg=$(go list ./...| grep -v testing | tr "\n" ",") $d
    if [ -f coverage.out ]; then
        tail -n +2 coverage.out >> coverage.txt || exit 255
        rm coverage.out
    fi
done
