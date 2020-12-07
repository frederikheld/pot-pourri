# MQTT Broker

This service is the backbone of the new communication infrastructure. It will replace _Pot Pourri's_ own REST API step by step.

The MQTT Broker is [HiveMQ Community Edition](https://www.hivemq.com/developers/community/) with no customizations so far.

## Note on different Architectures

_HiveMQ CE_ is available for a lot of architectures, but not _aarch64_, which is needed for RapsPi (given that it is running a 64-bit OS). It can be compiled for _aarch64_ though, following [_HiveMQ_'s official documentation](https://github.com/hivemq/hivemq-community-edition).

A Docker image compiled for _aarch64_  is available as `frederikheld/hivemq-ce`. Since this is a different source than the official _ HiveMQ_ image at `hivemq/hivemq-ce`, this services comes with a separate `Dockerfile` and `docker-compose.yml` if you want to run the service on _aarch64_ devices like the Raspberry Pi.

## Start service

You can build and run this container with `Docker`:

```sh
$ docker build -t pot-porri-mqtt-broker .
$ docker run -d -p 1883:1883 --name pot-pourri-mqtt-broker pot-pourri-mqtt-broker
```

Add `-f Dockerfile.aarch64` to the `build` command to build for _aarch64_.

The more convenient way is to start it with `docker-compose`:

```sh
$ docker-compose up -d
```

Add `-f docker-compose.aarch64.yml` to the `docker-compose` command to run it for _aarch64_.

You can also start the service together with all the other services that are part of _Pot Pourri_ as described in [README.md](../../README.md).