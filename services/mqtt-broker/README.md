# MQTT Broker

This service is the backbone of the new communication infrastructure. It will replace _Pot Pourri's_ own REST API step by step.

The MQTT Broker is [HiveMQ Community Edition](https://www.hivemq.com/developers/community/) with no customizations so far.

## Start service

You can build and run this container individually:

```sh
$ docker build -t pot-porri-mqtt-broker .
$ docker run -d -p 1883:1883 -p 8000:8000 --name pot-pourri-mqtt-broker pot-pourri-mqtt-broker
```

The more comfortable way is to start it together with all the other services that are part of _Pot Pourri_ as described in [README.md](../../README.md).