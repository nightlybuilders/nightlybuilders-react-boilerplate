# DOCKER

The boilerplate comes with a working [Dockerfile](../Dockerfile) and a [docker-compose
setup](./docker-compose.yml). One could use the created docker image to run the
app with Docker on production, for instance.

## Build a new Image

Build a new image with `docker-compose build`.

## Running the docker image locally

Once the docker image is built, you can start it with:

```
docker-compose up // or docker-compose -d
open http://localhost:8000
```
