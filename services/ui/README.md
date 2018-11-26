# Web UI for pot-pourri

This service provides a web UI for pot-pourri.

The service runs in a Docker container.

## Run it

To build this image run

    $ docker build -t pot-pourri-ui .

To run the container run

    $ sudo docker run --rm --name pot-pourri-ui -p 3002:3002 pot-pourri-ui

## Architecture

### Components diagram

![Components diagram for service UI of pot-pourri][https://potpourri.frederikheld.de/architecture/service_ui_components.png]

### Sequence diagram

![Sequence diagram for service UI of pot-pourri][https://potpourri.frederikheld.de/architecture/service_ui_sequence.png]
