#!/bin/sh

# This script removes all traces of the containers
# that were started with `start.sh`.
# You need to stop them with `stop.sh` before you
# run this script.
# You need to run it with elevated privileges!
#
# Note: With docker-compose, `start.sh` and `stop.sh`
# aren't needed anymore. However, you can use this
# script to clean up the containers after 
#   $ docker-compose down

docker container rm potpourri-persistence-telegraf
docker container rm potpourri-persistence-influxdb

docker network rm potpourri-persistence_default

echo "Volumes will not be deleted automatically!"
echo "See '$ docker volume ls' to see list of volumes."
echo "Use '$ docker volume rm <name>' to delete a volume."
