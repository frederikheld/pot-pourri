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

## Configure Grafana

After login, you're asked to change your password.

Go to `Configuration > Data Sources` and configure a new _InfluxDB_ data source. Note that - even if InfluxDB is running on the same machine as _Grafana_, `localhost` won't work. You have to set the IP of the machine!
