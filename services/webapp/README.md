# webapp

## Design principles

To always have an app that is maintainable with low effort, all design decisions shall be guided by the following rules.

### Data handling

* data that should be available consistently all over the app shall be kept in the Vuex store. Synchronization of such data with the providing service shall be done throguh Vuex actions.
* all view specific data should be handled by the respective view which synchronizes the data with the store (via getters and mutations) and passes it to the components (via props).
* components are dumb. They don't fetch or update data, they just get it passed through props. If updating of data is necessary, the respective function of the view is passed as a prop and called within the component.

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
