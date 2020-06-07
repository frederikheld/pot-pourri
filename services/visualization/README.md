# Visualization

This sevice provides data visualization with [_Grafana_](https://grafana.com/grafana/).

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

Navigate to the web interface of Grafana, which should be port 3000 on your host, if you kept the pre-defined configuration.

The standard credentials of the administrator account are

```
user:     admin
password: admin
```

After first login, you're asked to change your password.

## Data source

This instance of Grafana is already pre-configured to connect to the InfluxDB run by the [_persistence_](../persistence) service.

## Create your own dashboard

This instance of Grafana comes with a pre-prepared dashboard with panels that you can use to visualize your plants.

You can edit the panels to adapt them to your setup. You can either do that directly in the template or duplicate it first to keep it for future reference.

## Persistence

All changes you make will be persisted in the Docker volume called `potpourri-visualization_grafana`. So all your changes will still be there if you have to re-start your container for some reason.

If you want to start fresh, you need to delete this volume before you start the container.

```sh
$ docker volume rm potpourri-visualization_grafana
```