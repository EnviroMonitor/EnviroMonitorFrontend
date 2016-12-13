# EnviroMonitorFrontend

Frontend SPA for EnviroMonitor 

## Useful commands

- ``npm run build`` - build files to be used for production
- ``npm run build:watch`` - build files to be used for production in webpack watchmode
- ``npm run start`` - run a test server with hot reload on localhost:8080
- ``npm run test`` - run tests
- ``npm run test:watch`` - run tests continuously
- ``npm run coverage`` - run coverage report

## Docker (DEV)

- install docker and docker-compose
- ``cp docker-compose-sample.yml docker-compose.yml`` - prepare Your docker-compose.yml file, default is to run 
webpack-dev-server with hot reloading
- ``docker-compose start`` - start server container
- check ``http://localhost:8080``
- ``docker-compose logs`` - to see what is going on
- to run one off ``package.json`` configured command just do ``docker-compose run --rm server YOUR_CMD``
- to get into shell of container to debug ``docker-compose run --rm --entrypoint=/bin/sh server``
- to add more concurrent execution of ``packages.json`` commands just add entry in Your copied docker-compose.yml 
like so:

```
  builder:
    extends:
      file: docker-compose-base.yml
      service: base
    command: "build:watch"
```
