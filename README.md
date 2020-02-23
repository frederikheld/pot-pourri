# Pot Pourri

_Pot Pourri_ helps you to keep your potted plants alive

It collects data from connected sensor devices ([see the devices repository](https://github.com/frederikheld/pot-pourri-devices)) an displays it on a web interface. This helps you to track when your plants need water.

It is also planned to add an event engine that triggers actors attached the connected devices on pre-defined events. This will allow for automatically watering the plants, regulating sun and ventilation, etc.

## What does the name mean?

The name is a pun on many levels.

Firstly, a _potpourri_ is defined as 

> a mixture of dried, naturally fragrant plant materials, used to provide a gentle natural scent (source: [Wikipedia](https://en.wikipedia.org/wiki/Potpourri))

which your plants will hopefully never become if you use _Pot Pourri_.

It also refers of the wild mix of connected devices that can be used to collect data and act based on it.

And finally, the name is a composition of _Pot_ from "potted plants" and _Pourri_ form "the thing that pours water into the pots".

I really hope you're into puns.

## Run _Pot Pourri_

_Pot Pourri_ consists of several services that all need to be started to render the app fully functional.

### Prepare the environment

To run _Pot Pourri_ you need to have _Docker_ ([instructions](https://docs.docker.com/install/)) and _Docker-Compose_ ([instructions](https://docs.docker.com/compose/install/)) installed on your machine.

### Start the containers

The simplest way to run _Pot Pourri_ is to start all services at once.

To do this, simply navigate to the directory `./services` and run 

```$ docker-compose up -d```

You can now close the terminal, the containers will continue running in the background.

### Stop the containers

To shut the containers down, you can run

```$ docker-compose down```

in the same directory.

### Force rebuild on startup

If the containers don't exist yet, `docker-compose up` will build all specified containers before it starts them.

If the containers already exist, it will not rebuild them but start the existing ones.

So if you explicitly want to rebuild all containers (e. g. if you have changed the Dockerfiles), you have to run

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

### Testing

- Discussion about approaches on integration testing and unit testing in NodeJS: https://dev.to/jjjjcccjjf/need-recommendations-in-mocking-database--testing-cleanup-unit-testing-28eb
