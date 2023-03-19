# SoulMind - Kataszter Backend

Interactive database with Transylvanian priests.

**Technology stack**

-   Golang: https://golang.org/
-   MongoDB: https://www.mongodb.com/

**Setup development environment**

-   `git clone https://git.edu.codespring.ro/kataszter/kataszter-backend.git`
-   download vscode and install the [Go extension](https://code.visualstudio.com/docs/languages/go)
-   make sure that you use the settings from the `.vscode/settings.json` file
-   `go build`, `go test`, and other package-building commands add new dependencies as needed
-   `go build` to build code, or `go run main.go` to build & run

**Useful commands**

-   build for linux (docker image) locally in windows's powershell
    ```ps
    $Env:GOOS = "linux"; $Env:GOARCH = "amd64"
    go build -a -o ./builds/kataszter-backend_linux
    docker build . -t kataszter-backend
    ```
-   `go list -m all` prints all dependencies
-   `go get` changes the required version of a dependency (or adds a new dependency)
-   `go mod tidy` removes unused dependencies
-   `go test ./...` to test all packages
