#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

cd $DIR

PLATFORM="$(uname -s | awk '{print tolower($0)}')"
PROCESSOR="$(uname -p)"

$(cat /dev/null > debug.log)

TAIL="tail -f debug.log"
eval ${TAIL} &
TAIL_PID=`ps ax | grep -e "${TAIL}" | grep -v grep | awk '{print $1}'`
trap "kill $TAIL_PID" INT

$(./bin/${PLATFORM}/${PROCESSOR}/nw .)

kill $TAIL_PID