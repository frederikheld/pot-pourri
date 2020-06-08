# Visualization

This sevice provides data visualization with [_Grafana_](https://grafana.com/grafana/).

> Note that this service pulls data from the InfluxDB instance in [persistence](../persistence) service. So you need to start up persistence first via it's `docker-compose` file before you start up this service!

## Configure environment

Duplicate `.env.template` and rename it to `.env`.

If you need to use ports that are different from the standard configuration, you can set them in `.env`.

## Run

```sh
$ docker-compose up
```

Add `-d` flag to keep containers running in background (detached mode).

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