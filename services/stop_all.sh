#!/bin/sh

# stop webapp
cd webapp
docker-compose down
cd ..

# stop ui
cd ui
docker-compose down
cd ..

# stop datastore
cd datastore
docker-compose down
cd ..

# stop visualization
cd visualization
docker-compose down
cd ..

# stop persistence
cd persistence
docker-compose down
cd ..

# stop mqtt-broker
cd mqtt-broker
docker-compose down
cd ..
