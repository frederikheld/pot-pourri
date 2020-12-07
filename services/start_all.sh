#!/bin/sh

# start mqtt-broker
cd mqtt-broker
if [ "$(uname -m)" = "aarch64" ]; then
    docker-compose -f docker-compose.aarch64.yml up -d --build --force-recreate
else
    docker-compose up -d --build --force-recreate
fi
cd ..

# start persistence
cd persistence
docker-compose up -d --build --force-recreate
cd ..

# start visualization
cd visualization
docker-compose up -d --build --force-recreate
cd ..

# start metastore
cd metastore
docker-compose up -d --build --force-recreate
cd ..

# start webapp
cd webapp
docker-compose up -d --build --force-recreate
cd ..
