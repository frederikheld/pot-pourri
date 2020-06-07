# Persistence

This service uses [_Telegraf_](https://www.influxdata.com/time-series-platform/telegraf/) to collect data sent over _MQTT_ and persists it in an [_InfluxDB_](https://www.influxdata.com/products/influxdb-overview/) databse.

This is an alternative approach to what I had already started in [datastore](../datastore).

## Configure environment

Duplicate `.env.template` and rename it to `.env`.

If you need to use ports that are different from the standard configuration, you can set them in `.env`.

## Run

```sh
$ docker-compose up
```

Add `-d` flag to keep containers running in background (detached mode).

Add `--force-recreate` if you want to make sure that Docker builds your containers anew.

## Configure tools

> Note: Data is not persisted at the moment! If you stop the containers, you will lose the collected datapoints as well as the configuration you made via the web UI!

- [ ] Store tool configurations in repo and load it at container startup.

### Telegraf

Navigate to `localhost:8888` in your browser.

You need to change the _hostname_ from `localhost` to the LAN IP of your machine. Otherwise the connection will fail.

- [ ] Fix the above issue!


