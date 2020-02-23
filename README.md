# pot-pourri

// todo: What does it do?

## Prepare environment

To run _Pot Pourri_ you need to have _Docker_ ([instructions](https://docs.docker.com/install/)) and _Docker-Compose_ ([instructions](https://docs.docker.com/compose/install/)) installed on your machine.

## Run _Pot Pourri_

_Pot Pourri_ consists of several services that all need to be started to render the app fully functional.

### Start the containers

The easiest way is to run the app is to start all services at once. To do this, simply navigate to the directory `./services` and run 

```$ docker-compose up -d```

You can now close the terminal, the containers will continue running in the background.

### Stop the containers

To shut the containers down, you can run

```$ docker-compose down```

in the same directory.

### Force rebuild on startup

If the containers don't exist yet, `docker-compose up` will first build and then run all specified containers.

If the containers already exist, it will not rebuild them but start the existing ones.

So if you explicitly want to rebuild all containers, you have to run

```$ docker-compose build --force-recreate```

to start the containers.

## Services

_Pot Pourri_ consists of several services that communicate via REST api calls. The system context looks like this:

![System Context of pot-pourri](https://potpourri.frederikheld.de/architecture/system_context.png)

Please see the readme of each service for more details!

### datastore

The `datastore` service accepts data items and stores them in a database which is being persisted in a mounted volume.

### ui

The `ui` provides a web app that displays data and allows interaction with _Pot Pourri_.

## Devices

You will find the devices that provide the `datastore` with data in the separate repository https://github.com/frederikheld/pot-pourri-devices.git.

## Useful links

### NodeMCU

- NodeMCU power supply: http://henrysbench.capnfatz.com/henrys-bench/arduino-projects-tips-and-more/powering-the-esp-12e-nodemcu-development-board/
- ESP32 deep sleep: http://educ8s.tv/esp32-deep-sleep-tutorial/

### Sensors

- Humidity sensors compared: https://www.youtube.com/watch?v=udmJyncDvw0

### Testing

- Discussion about approaches on integration testing and unit testing in NodeJS: https://dev.to/jjjjcccjjf/need-recommendations-in-mocking-database--testing-cleanup-unit-testing-28eb
