# Persistence

The purpose of the _persistence_ service is to collect all values that were sent from _Pot Pourri_ devices and store them in a database for later use.

It uses [_InfluxDB_](https://www.influxdata.com/products/influxdb-overview/) for this purpose, as it is specifically made for time-series data.

_InfluxDB_ is sided by [_Telegraf_](https://www.influxdata.com/time-series-platform/telegraf/), which works as an adapter that receives _MQTT_ messages, converts them into the _InfluxDB_ data format, and stores them in the database.

## Deployment

This service runs out of the box. If you need to configure your deployment different from the default values, have a look at section _Advanced configuration_ below!

To deploy the app manually, conduct the following steps:

1. Pull the latest changes with `$ git checkout master && git pull`
1. Build the app with `$ docker-compose build`
1. Start the updated containers with `$ docker-compose up -d`

If you want to update the still running app, you can conduct the same steps without the need to stop the container first.

If you have just changed the _Telegraf_ configuration [./telegraf/telegraf.conf](./telegraf/telegraf.conf) (see more about the configuration below), both commands won't work as neither the image nor the container have changed. In this case you can restart the containers with `$ docker-compose restart`.

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