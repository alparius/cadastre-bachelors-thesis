#  __  __       _         __ _ _
# |  \/  | __ _| | _____ / _(_) | ___
# | |\/| |/ _` | |/ / _ \ |_| | |/ _ \
# | |  | | (_| |   <  __/  _| | |  __/
# |_|  |_|\__,_|_|\_\___|_| |_|_|\___|
#
# Contains the common commands to build, test, validate and deploy the
# kataszter-backend project.
#

WHITE=\033[0m
RED=\033[0;31m
PURPLE=\033[0;35m
GREEN=\033[0;32m

#  __
# |__)     . |  _|
# |__) |_| | | (_|
#

.PHONY: all
all: help

.PHONY: run
run:
	cd bin && ./kataszter-backend

.PHONY: run-dev
run-dev:
	cd bin && ./kataszter-backend --dev

.PHONY: build
build:
	go build -o bin/kataszter-backend

#  __
# /   |_   _  _ |
# \__ | ) (- (_ |(
#

.PHONY: lint
lint:
	golangci-lint run ./... -v

.PHONY: fmt
fmt:
	go fmt ./...

.PHONY: prune
prune: prune-backend

.PHONY: prune-backend
prune-backend:
	go mod tidy

# ___
#  |   _  _ |_
#  |  (- _) |_
#

.PHONY: test
test:
	go test ./... -cover -v -p 1 | sed ''/PASS/s//$$(printf "\033[32mPASS\033[0m")/'' | sed ''/FAIL/s//$$(printf "\033[31mFAIL\033[0m")/''

.PHONY: cover
cover:
	./tools/coverage.sh
	go tool cover -func=coverage.txt

.PHONY: cover-html
cover-html:
	go tool cover -html=coverage.txt

.PHONY:
clean:
	rm -rf bin
	rm -f kataszter-backend
	rm -f kataszter-backend.zip

.PHONY: bin
bin:
	mkdir bin

#  __
# |  \  _  _  |  _
# |__/ (- |_) | (_) \/
#         |         /

.PHONY: xbuild-backend
xbuild-backend:
	GOOS=linux   GOARCH=amd64 go build -ldflags $(BUILD_FLAGS) -o bin/linux-amd64/kataszter-backend
	GOOS=linux   GOARCH=386   go build -ldflags $(BUILD_FLAGS) -o bin/linux-386/kataszter-backend
	GOOS=windows GOARCH=amd64 go build -ldflags $(BUILD_FLAGS) -o bin/windows-amd64/kataszter-backend.exe
	GOOS=windows GOARCH=386   go build -ldflags $(BUILD_FLAGS) -o bin/windows-386/kataszter-backend.exe
	GOOS=darwin  GOARCH=amd64 go build -ldflags $(BUILD_FLAGS) -o bin/macos-amd64/kataszter-backend

.PHONY: xbuild-zip
xbuild-zip:
	zip -r kataszter-backend.zip tools/autocomplete bin LICENSE

.PHONY: xbuild
xbuild: clean bin xbuild-backend xbuild-zip

#
# |__|  _ |  _
# |  | (- | |_)
#           |

.PHONY: help
help:
	@echo "HELP\n"
	@echo "$(RED)SYNOPSIS$(WHITE)"
	@echo "	make 	[lint]"
	@echo "		[run]"
	@echo "		[build]"
	@echo "		[test]"
	@echo "		[cover]"
	@echo "		[cover-html]"
	@echo "		[docs]"
	@echo "		[xbuild]"
	@echo "		[xbuild-backend]"
	@echo "		[xbuild-zip]"
	@echo "\n$(RED)COMMANDS$(WHITE)"
	@echo "	$(GREEN)lint$(WHITE)"
	@echo "		Runs a linter on the backend code."
	@echo "	$(GREEN)run$(WHITE)"
	@echo "		Run the kataszter-backend."
	@echo "	$(GREEN)build$(WHITE)"
	@echo "		Build the backend."
	@echo "	$(GREEN)test$(WHITE)"
	@echo "		Runs the backend unit tests."
	@echo "	$(GREEN)cover$(WHITE)"
	@echo "		Calculates coverage for backend."
	@echo "	$(GREEN)cover-html$(WHITE)"
	@echo "		Runs the coverage web page for backend."
	@echo "	$(GREEN)docs$(WHITE)"
	@echo "		Generate API swagger documentation."
	@echo "	$(GREEN)xbuild$(WHITE)"
	@echo "		Build the backend and the UI for Linux, macOS and Windows."
	@echo "	$(GREEN)xbuild-backend$(WHITE)"
	@echo "		Build the backend.  for Linux, macOS and Windows."
