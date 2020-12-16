# Todo App

## Running the server
```
cd server
./gradlew bootRun
```
The server also contains an Open API 3 documentation available via: 
http://localhost:8080/swagger-ui/index.html

## Running the app 
```
cd app
npm run client
```

## Generating Docs from Tests
```
./gradlew asciidoctor
```
In the build directory you will find a folder asciidoc which contains the documentation.

## Running E2E Tests
```
cd app
npm run e2e:local
```