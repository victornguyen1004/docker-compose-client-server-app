# Client - Server App

The purpose of this project is to learn how to Dockerize a WebApp, more specifically a client-server app.

## How to run the app with individual images from DOCKER HUB

First make sure that you installed Docker Desktop and that it is running.

```bash
docker pull victornguyen1004/client-server:client
docker run --rm -d -p 3000:3000 victornguyen1004/client-server:client

docker pull victornguyen1004/client-server:server
docker run --rm -d -p 8080:8080 victornguyen1004/client-server:server

docker pull mongo
docker run -d -p 27017:27017 --rm --name db-app mongo
```

## How to run the app with DOCKER COMPOSE

First make sure that you installed Docker Desktop and that it is running.

Navigate the terminal to the root directory. Run this:

```bash
  docker-compose build
  docker-compose up -d
```

To stop the app. Run this:

```bash
  docker-compose down
```

Yeah, that's all. Just think of how crazier Docker Compose can do!
