#!/bin/sh -ex
cd $(dirname $0)/..

trap "docker-compose down --volumes --remove-orphans" 0
docker-compose down --volumes --remove-orphans
docker-compose build dev_app
docker-compose run --rm dev_app "npm i"
docker-compose run --rm --service-ports dev_app "npm start"
