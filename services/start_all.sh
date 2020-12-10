#!/bin/sh

# This script helps to
#   * start all services in the right order
#   * start only the core serivces
#   * start services that require different base images on different
#     architectures without manual configuration

# helper functions
print_help_text() {
    echo "This script will"
    echo ""
    echo "  * Start all services in the right order, which is"
    echo "    - mqtt-broker"
    echo "    - persistence"
    echo "    - visualization"
    echo "    - metastore"
    echo "    - webapp"
    echo ""
    echo "  * Allow you to start only core services (see options below)"
    echo ""
    echo "  * Start services that require different base images on different"
    echo "    architectures without the need for manual configuration"
    echo ""
    echo "Usage:"
    echo ""
    echo "  $ sudo sh start_all.sh [-c|--core-only]"
    echo ""
    echo "Options:"
    echo ""
    echo "  -c | --core-only:  Will only start the core services, which are"
    echo "                       * mqtt-broker"
    echo "                       * persistence"
    echo "                       * metastore"
    echo ""
    echo "  -h | --help:       Print this help text"
}

# parse args
CORE_ONLY=false
while getopts c-: OPT; do
    if [ "$OPT" = "-" ]; then
        OPT="${OPTARG%%=*}"     # extract long option name
        OPTARG="${OPTARG#$OPT}" # extract long option argument (may be empty)
        OPTARG="${OPTARG#=}"    # if long option argument, remove assigning `=`
    fi
    case "$OPT" in
        c | core-only ) CORE_ONLY=true ;;
        h | help ) print_help_text; exit 0 ;;
    esac
done
# Source: https://stackoverflow.com/questions/402377/using-getopts-to-process-long-and-short-command-line-options (CC BY-SA 4.0)


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
if [ ! CORE_ONLY ]; then
    cd visualization
    docker-compose up -d --build --force-recreate
    cd ..
else
    echo "Skipping 'visualization': not a core service."
fi

# start metastore
cd metastore
docker-compose up -d --build --force-recreate
cd ..

# start webapp
if [ ! CORE_ONLY ]; then
    cd webapp
    docker-compose up -d --build --force-recreate
    cd ..
else
    echo "Skipping 'webapp': not a core service."
fi
