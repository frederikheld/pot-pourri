#!/bin/sh

# Trying to parse long options with cross-platform UNIX getopts
# (which does not support long options out of the box).
# This can parse short and long options. Options can have
# following the pattern
#
#       --option=argument
#       -o=argument
#
# Source: https://stackoverflow.com/questions/402377/using-getopts-to-process-long-and-short-command-line-options
# License: (CC BY-SA 4.0)

while getopts c-: OPT; do

    if [ "$OPT" = "-" ]; then
        OPT="${OPTARG%%=*}"     # extract long option name
        OPTARG="${OPTARG#$OPT}" # extract long option argument (may be empty)
        OPTARG="${OPTARG#=}"    # if long option argument, remove assigning `=`
    fi

    case "$OPT" in
        c | core-only ) echo "core only" ;;
    esac
done
