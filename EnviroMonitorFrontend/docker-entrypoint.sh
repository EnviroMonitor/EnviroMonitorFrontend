#!/bin/sh
cd /code

# for concurrent runs of more than one service using this container
# eg. default server and coverage?
if [ "$1" != 'start' ]; then
    echo "Waiting (15s) to be sure node_modules are copied localy..."
    sleep 15
fi

if [ "$1" = 'start' ]; then
    # copy node_modules localy
    if [ ! -d "./node_modules" ]; then
        cp /install/node_modules ./ -R
    fi
    # clear and update node_modules on each start
    npm prune
    npm install
    # change owner on each start
    find . -user root -type d -print0 | xargs -0 chown ${DEFAULT_UID}:${DEFAULT_GID} -R
fi

exec npm run "$1"
