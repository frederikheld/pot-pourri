# Persistence

The purpose of the _persistence_ service is to collect all values that were sent from _Pot Pourri_ devices and store them in a database for later use.

It uses [_InfluxDB_](https://www.influxdata.com/products/influxdb-overview/) for this purpose, as it is specifically made for time-series data.

_InfluxDB_ is sided by [_Telegraf_](https://www.influxdata.com/time-series-platform/telegraf/), which works as an adapter that receives _MQTT_ messages, converts them into the _InfluxDB_ data format, and stores them in the database.

## Run

This service runs out of the box. If you need to configure your deployment different from the default values, have a look at section _Advanced configuration_ below!

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

Changes in _Telegraf_ aren't persisted as _Telegraf_ is being configured via [./telegraf/telegraf.conf](./telegraf/telegraf.conf) and changes at runtime that need to be persisted aren't necessary.

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