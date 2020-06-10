# Persistence

This service uses [_Telegraf_](https://www.influxdata.com/time-series-platform/telegraf/) to collect data sent over _MQTT_ and persists it in an [_InfluxDB_](https://www.influxdata.com/products/influxdb-overview/) databse. Furthermore it starts a [_Chronograf_](https://www.influxdata.com/time-series-platform/chronograf/) instance that provides an web interface to interact with the database.

> Note: This is an alternative approach to what I had already started in [datastore](../datastore).

## Run

This service runs out of the box. If you need to configure your deployment different from the default values, see section _Advanced configuration_ below!

You can start this service via `docker-compose`:

```sh
$ docker-compose up
```

Add the `-d` flag to keep containers running in background (detached mode). This allows you to close the terminal after _Grafana_ was started.

Add `--force-recreate` if you want to make sure that Docker builds your containers anew. This is useful if you have started them before but have changed the configuration or provisioning files.

## Data persistence

InfluxDB will persist the collected data in a Docker volume called `potpourri-persistence_influxdb`. So all your data will still be there if you shut down and re-start your container.

If you want to start fresh, you need to delete this volume before you start the container again. Deleting volumes is only possible if you delete the containers that use them first:

```sh
$ docker rm potpourri-persistence-influxdb
$ docker volume rm potpourri-persistence_influxdb
```

Changes in _Telegraf_ and _Chronograf_ aren't persisted. _Telegraf_ is being configured via [./telegraf/telegraf.conf](./telegraf/telegraf.conf) and changes at runtime that could be persisted aren't necessary. _Chronograf_ has similar features than _Grafana_, which comes with the [_visualization_](../visualization/README.md) module. But it's more meant as a playground to fiddle around with the database, therefore it makes sense to leave it clean. If you need proper visualization, use the _visualization_ module instead!

## Stop

If you have run `docker-compose` without the `-d` flag, your terminal is still open. Just close the terminal or hit <kbd>Ctrl + D</kbd> to stop the program.

If you have run `docker-compose` with the `-d` flag, open a terminal, navigate to the location of this service's `docker-compose.yml` and execute

```sh
$ docker-compose down
```

## Advanced configuration

If the default configuration doesn't fit your needs, you have the following options to change it.

All changes described here will take effect when you start the container with `docker-compose up`.

### Configure Docker environment

The port used by the three tools as well as the project name prefix that `docker-compose` will use, can be configured in the `.env` file.

### Configure Telegraf instance

_Telegraf_ can configured via [./telegraf/telegraf.conf](./telegraf/telegraf.conf). You can edit it a according to your needs.

> You can find more information on configuring _Telegraf_ [here](https://docs.influxdata.com/telegraf/v1.14/administration/configuration/).

## Additional tools

For normal use, `docker-compose` should be all you need to be happy. However, if you change `docker-compose.yml` often and need to shutdown and start your setup frequently, there are a couple of scripts in [./scripts](./scripts) that might be useful for you.

Please see the comments in the script files for more details!