#!/bin/sh

# This script is intended to stop all containers
# that were started with `start.sh`.
# You need to run it with elevated privileges!

docker stop potpourri-persistence-chronograf
docker stop potpourri-persistence-telegraf
docker stop potpourri-persistence-influxdb
