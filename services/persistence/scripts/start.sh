#!/bin/sh

# This script runs the necessary Docker commands
# to get Telegram and InfluxDB up and running.
# You need to run it with elevated privileges!
#
# Note: This script does the same as
#   $ docker-compose up

# create common network
docker network create potpourri-persistence_default

# start InfluxDB (store data)
docker run -d --net=potpourri-persistence_influxdb -p 8083:8083 -p 8086:8086 --name potpourri-persistence-influxdb influxdb:alpine

# start Telegraf (collect data)
docker run -d -v $PWD/telegraf.conf:/etc/telegraf/telegraf.conf:ro --net=potpourri-persistence_default --name potpourri-persistence-telegraf telegraf:alpine

# start Chronograph (Web UI to visualize data)
docker run -d --net=potpourri-persistence_default -p 8888:8888 --name potpourri-persistence-chronograf quay.io/influxdb/chronograf:1.8.4
