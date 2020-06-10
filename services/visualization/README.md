# Visualization

This sevice provides data visualization with [_Grafana_](https://grafana.com/grafana/) using data collected by the [_persistence_](../persistence) sevice of _Potpourri_.

It comes with a template for a dashboard that you can use to visualize your own setup.

![Screenshot of the Grafana dashboard for Potpourri](docs/screenshot-dashboard.png)

## Prerequisites

This service pulls data from the _InfluxDB_ instance in the [_persistence_](../persistence) service. So you need to start up _persistence_ via `docker-compose` before you start this service! See docs in the persistence service for further information.

## Run

This service runs out of the box, if you haven't changed any configuration in the _persistence_ service. If so, see section _Advanced configuration_ below!

You can start this service via `docker-compose`:

```sh
$ docker-compose up
```

Add the `-d` flag to keep containers running in background (detached mode). This allows you to close the terminal after _Grafana_ was started.

Add `--force-recreate` if you want to make sure that Docker builds your containers anew. This is useful if you have started them before but have changed the configuration or provisioning files.

## First start

Open to the web interface of _Grafana_, which is availabe on `3000` on your host, with your browser.

The default credentials of the administrator account are

```
user:     admin
password: admin
```

After first login, you're asked to change your password.

## Create your own dashboard

This instance of _Grafana_ comes with a dashboard template with panels that you can use to visualize the data of you plants.

In order to create your own dashboard, make a copy of the template and save it under a different name.

## Data persistence

All changes you make will be persisted in the Docker volume `potpourri-visualization_grafana`. So all your changes will still be there if you shut down and re-start your container.

If you want to start fresh, you need to delete this volume before you start the container again. Deleting volumes is only possible if you delete the containers that use them first:

```sh
$ docker rm potpourri-visualization-grafana
$ docker volume rm potpourri-visualization_grafana
```

Note that you can not save changes in the dashboard template and the default data source as they are provisioned via configuration files in [./grafana/provisioning](./grafana/provisioning). If you want to change or delete them, you have to delete the configuration files! The better way to make changes is to duplicate the dashboard or data source in the web interface and edit the duplicate.

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

The port used by _Grafana_ as well as the project name prefix that `docker-compose` will use, can be configured in the `.env` file.

### Configure Grafana instance

_Grafana_ can configured via [./grafana/grafana.ini](./grafana/grafana.ini). You can edit it a according to your needs.

> You can find more information on configuring _Grafana_ [here](https://grafana.com/docs/grafana/latest/installation/configuration/).

### Data source

This instance of _Grafana_ is already pre-configured to connect to the _InfluxDB_ instance run by the [_persistence_](../persistence) service.

If you want to connect to a different data source, you can easily configure it via the _Grafana_ web interface.

Another option is to duplicate [_./grafana/datasources/influxdb.yml_](./grafana/datasources/influxdb.yml) rename it and change the values according to your needs. The changes come into effect when you re-start the Docker container.

> You can find more information about provisioning _Grafana_ [here](https://grafana.com/docs/grafana/latest/administration/provisioning/).