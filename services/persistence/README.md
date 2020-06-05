# Persistence

This service uses [_Telegraf_](https://www.influxdata.com/time-series-platform/telegraf/) to collect data sent over _MQTT_ and persists it in an [_InfluxDB_](https://www.influxdata.com/products/influxdb-overview/) databse.

This is an alternative approach to what I had already started in [datastore](../datastore).

## Run with Docker

```sh

# InfluxDB
$ docker run -d -p 8083:8083 -p 8086:8086 --name influxdb influxdb:alpine

# Telegraf
$ docker run --net=container:influxdb --name telegraf telegraf:alpine
```
See: [https://hub.docker.com/_/influxdb](https://hub.docker.com/_/influxdb)