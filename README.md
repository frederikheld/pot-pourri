# pot-pourri

// todo: What does it do?

## Prepare environment

To run the app, you need to have Docker and Docker-Compose installed. Please install it according to the following instructions in the Docker docs:

Install Docker: https://docs.docker.com/install/
Install Docker-Compose: https://docs.docker.com/compose/install/

## Run it

You can run each service individually as a stand-alone node app with `npm start` or inside a docker container. This is particularly helpful if you want to run the services on different machines.

The easiest way is to run the app is to start all services at once. To do this, simply run `docker-compose up` in the directory _./services_. To stop all services, you can run `docker-compose down` in a separate terminal window at the same location.

`docker-compose up` will first build and then run all containers. If the containers already exist, it will not re-build them but use the existing ones. If you explicitly want to re-build all containers, use `docker-compose build` before you call `docker-compose up`.

## Architecture

The pot-pourri application consists of several microservices that communicate via rest apis. See the api description of each service for more details.

### datastore

The `datasore` service accepts data items and stores them in an internal database.

It also answers to requests for specified chunks of data.

### ui

The `ui` provides a graphical user interface that allows interaction with the app.

## Devices

You will find the devices that provide the `datastore` with data in the separate repository https://github.com/frederikheld/pot-pourri-devices.git.

## Useful links

### NodeMCU

- NodeMCU power supply: http://henrysbench.capnfatz.com/henrys-bench/arduino-projects-tips-and-more/powering-the-esp-12e-nodemcu-development-board/
- ESP32 deep sleep: http://educ8s.tv/esp32-deep-sleep-tutorial/

### Sensors

- Humidity sensors compared: https://www.youtube.com/watch?v=udmJyncDvw0
