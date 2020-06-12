#!/bin/sh

# start mqtt-broker
cd mqtt-broker
docker-compose up -d --force-recreate
cd ..

# start persistence
cd persistence
docker-compose up -d --force-recreate
cd ..

# start visualization
cd visualization
docker-compose up -d --force-recreate
cd ..

# start datastore
cd datastore
docker-compose up -d --force-recreate
cd ..

# start ui
cd ui
docker-compose up -d --force-recreate
cd ..

# start webapp
cd webapp
docker-compose up -d --force-recreate
cd ..
