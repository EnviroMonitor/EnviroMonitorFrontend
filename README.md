# EnviroMonitorFrontend

Frontend SPA for EnviroMonitor 

[![Build Status](https://travis-ci.org/EnviroMonitor/EnviroMonitorFrontend.svg?branch=6-adding-ci-integration)](https://travis-ci.org/EnviroMonitor/EnviroMonitorFrontend)

## Useful commands

- ``npm run build`` - build files to be used for production
- ``npm run start`` - run a test server with hot reload on localhost:8080
- ``npm run test`` - run tests
- ``npm run test:watch`` - run tests continuously
- ``npm run coverage`` - run coverage report

## Docker (DEV)

- install docker and docker-compose
- ``cp ./docker/docker-compose.yml ./docker-compose.yml`` - prepare Your docker-compose.yml file, default is to run 
webpack-dev-server with hot reloading (translate to container ``npm run start``), it should be enought to develop 
project
- ``docker-compose up`` - start server container with log output, ``CTRL+c`` to stop
- check ``http://localhost:8080``
- each change in the code should be reflected automatically in Your browser
- to run one off ``package.json`` configured command just do ``docker-compose run --rm server YOUR_CMD``
- to get into shell of container to debug ``docker-compose run --rm --entrypoint=/bin/sh server``
- executing container **will automatically prune and install** new dependencies from ``packages.json`` rebuilding is not 
needed
- to change ENV variables check [this](https://docs.docker.com/compose/compose-file/#/environment) docker-compose 
manual + defaults set in `Dockerfile`
- to add more concurrent execution of ``packages.json`` commands just add entry in Your copied docker-compose.yml 
like so:

```
  builder:
    extends:
      file: docker-compose-base.yml
      service: base
    command: "build:watch"
```
