#!/bin/sh

# stop webapp
cd webapp
docker-compose down
cd ..

# stop metastore
cd metastore
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
if [ "$(uname -m)" = "aarch64" ]; then
    docker-compose -f docker-compose.aarch64.yml down
else
    docker-compose down
fi
cd ..
