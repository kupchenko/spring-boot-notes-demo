# Notes management system

### Getting started

### Setting up UI:

* Install dependencies UI part with ```npm i```
* UI Prod-Build ```npm run build:prod```
* Move output from ```ui/dist``` folder to ```src/main/resources/static```

### Run the application:

* Start the application by executing: 

```
    ./gradlew clean bootRun
```

* DEV: Start the application by executing: 

```
    ./gradlew bootRun --args='--spring.profiles.active=dev' 
```

### Build service docker image:

To build run:
```
    docker build -t notes:1.0-notes-service -f src/main/docker/Dockerfile .
```

To run:
```
    docker run -p 8080:8080 notes:1.0-notes-service
```

### Build ui docker image:

To build run:
```
    docker build -t notes:1.0-notes-frontend -f ui/src/docker/Dockerfile .
```

To run:
```
    docker run -p 80:80 notes:1.0-notes-frontend
```