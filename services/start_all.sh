#!/bin/sh

# This script helps to
#   * start all services in the right order
#   * start only the core serivces
#   * start services that require different base images on different
#     architectures without manual configuration

set -eu

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
    echo "  $ sh start_all.sh [-c|--core-only] [-h|--help]"
    echo ""
    echo "Options:"
    echo ""
    echo "  -c, --core-only  Start only the core services, which are"
    echo "                     * mqtt-broker"
    echo "                     * persistence"
    echo "                     * metastore"
    echo ""
    echo "  -h, --help       Print this help text"
}

report_illegal_opt() {
    echo "$*" >&2
    exit 2
}

# parse args
CORE_ONLY=false
LONGOPT=false
while getopts ch-: OPT; do

    # Parse long options (double-dash)
    if [ "$OPT" = "-" ]; then
        LONGOPT=true
        OPT="${OPTARG%%=*}"     # extract long option name
        OPTARG="${OPTARG#$OPT}" # extract long option argument (may be empty)
        OPTARG="${OPTARG#=}"    # if long option argument, remove assigning `=`
    fi

    # Throw error for longopts with only one char length (edge case)
    if [ "${LONGOPT}" = true ] && [ ${#OPT} -eq 1 ]; then
        report_illegal_opt "Illegal option --${OPT}"
    fi

    case "$OPT" in
        h | help ) print_help_text; exit 0 ;;
        c | core-only ) CORE_ONLY=true ;;
        ??* ) report_illegal_opt "Illegal option --${OPT}" ;; # bad long option
        ? ) exit 2 ;; # bad short option (error was already reported via getopts)
    esac
done
# This is a workaround to use POSIX compatible `getopts`, which allows only short options, to parse long options as well.
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
if ! $CORE_ONLY; then
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
if ! $CORE_ONLY; then
    cd webapp
    docker-compose up -d --build --force-recreate
    cd ..
else
    echo "Skipping 'webapp': not a core service."
fi
