# Visualization

This sevice provides data visualization with [_Grafana_](https://grafana.com/grafana/).

> Note that this service pulls data from the InfluxDB instance in [persistence](../persistence) service. So you need to start up persistence first via it's `docker-compose` file before you start up this service!

## Configure environment

Duplicate `.env.template` and rename it to `.env`.

If you need to use ports that are different from the standard configuration, you can set them in `.env`.

## Configure Grafana instance

This instance comes with a default [`grafana.ini`](https://grafana.com/docs/grafana/latest/installation/configuration/#comments-in-ini-files) which you can edit according to your needs. However, this is not necessary to run _Grafana_!

## Run

```sh
$ docker-compose up
```

Add `-d` flag to keep containers running in background (detached mode). This allows you to close the terminal after _Grafana_ was started.

Add `--force-recreate` if you want to make sure that Docker builds your containers anew.

## First start

Navigate to the web interface of _Grafana_, which should be port `3000` on your host, if you kept the pre-defined configuration.

The standard credentials of the administrator account are

```
user:     admin
password: admin
```

After first login, you're asked to change your password.

## Data source

This instance of _Grafana_ is already pre-configured to connect to the _InfluxDB_ instance run by the [_persistence_](../persistence) service.

## Create your own dashboard

This instance of _Grafana_ comes with a dashboard template with panels that you can use to visualize your plants.

You can edit the panels to adapt them to your setup. You can either do that directly in the template or duplicate the template first to keep it for future reference.

## Persistence

All changes you make will be persisted in the Docker volume `potpourri-visualization_grafana`. So all your changes will still be there if you have to re-start your container for some reason.

If you want to start fresh, you need to delete this volume before you start the container again. Deleting volumes is only possible if you delete the containers that use them first!

```sh
$ docker rm potpourri-visualization-grafana
$ docker volume rm potpourri-visualization_grafana
```

## Stop

If you have run `docker-compose` without the `-d` flag, your terminal is still open. Just close the terminal or hit `ctrl + D` to stop the program.

If you have run `docker-compose` with the `-d` flag, open a terminal, navigate to the location of this service's `docker-compose.yml` and execute

```sh
$ docker-compose down
```