# Metastore

This service stores meta information about plants and devices. Information can be accessed and manipulated via a REST API.

> Note: This is currently being developed and not ready for production yet!

## Run

This service is being run with Docker. It comes with a `docker-compose` file that follows the _Pot Purri_ service pattern.

To start the service, run:

```sh
$ docker-compose up -d
```

To stop the service, run:

```sh
$ docker-compose down
```

To re-build the container before you start it, you have to run:

```sh
$ docker-compose build
$ docker-compose up -d
```