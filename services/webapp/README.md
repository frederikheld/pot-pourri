# webapp

## Tools for local development

### VSCode configuration

To enable Vue code highlighting in VSCode, install the extension _Vetur_.

_Vetur_ can do linting as well, but unfortunately it doesn't resepct the linting settings in `.eslintrc.js`. Therefore it's better to install the extension _Prettier_ to do the job. _Prettier_ will use the `.vscode` config that comes with this module.

### Project setup

```
$ npm install
```

### Build and Run

#### Compiles and hot-reloads for development

```
$ npm run serve
```

#### Compiles and minifies for production

```
$ npm run build
```

### Quality Checks

#### Run your unit tests

```
$ npm run test:unit
```

#### Run your end-to-end tests

```
$ npm run test:e2e
```

#### Lints and fixes files

```
$ npm run lint
```

## CI/CD

This module comes with a GitHub workflow that runs the Quality Checks. See [.github/workflows/quality-checks.yml](.github/workflows/quality-checks.yml)


## Deployment

To deploy the app manually, conduct the following steps:

1. Pull the latest changes with `git checkout master && git pull`
1. Build the app with `docker-compose build`
1. Start the updated containers with `docker-compose up -d`

If you want to update the still running app, you can conduct the same steps without the need to stop the container first.

## Useful Links

- MQTT Client library in JS _Eclipse Paho_ How To: https://www.hivemq.com/blog/mqtt-client-library-encyclopedia-paho-js/
- Enable MQTT over websockets in _Mosquitto_: https://blog.ithasu.org/2016/05/enabling-and-using-websockets-on-mosquitto/
