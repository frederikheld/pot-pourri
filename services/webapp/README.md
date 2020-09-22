# webapp

## Design principles

To always keep this app maintainable, all design decisions shall be guided by the following rules.

The guideline will speak of _entities_, which means the representation of physical objects in the app and services that handle data. For better understanding we will use _plant_ and _plants_ as an example. Those can be replaced by any other entity when applying the pattern.

### Data handling

Views that allow the manipulation of data in the database (via API):

* the view itself should handle all data necessary to render it's components and sub-components
* the reference for requesting data is the entity ID passed via the route (this.$route.params.id)
* the view fetches the data directly from the respective API and stores it in local state (data())
* while the necessary data is fetched, the view shows an loading indicator

Components can have own data handling:

* when to use
    * if the data is not essential to use the view
    * if fetching the data takes a lot of time and would block other features in the view that could be already used
    * if placing the data handling in the component reduces duplication and complexity
* interface
    * the entity object is passed as a prop
    * callbacks can be passed as props
    * events should be avoided as they make the interface intransparent
* the references for requesting data from an API is the entity ID passed with the entity object via props (this.$props.entity.id)

Components without own data handling:

* when to use
    * for visualization (like diagrams, indicators, ...)
    * if the same data is needed for other components in the view and thus putting the data handling into the component would lead to multiple requests for the same data
* interface
    * the necessary data is passed via props
    
Globale state (via Vuex):

* Vuex should not be used to buffer data from an API. The app is not meant to have offline editing capabilities and in most cases we want to have up-to-date and consistent data from the server, so a detour via Vuex would only add unnecessary complexity without providing any value
* global state (like app settings) are read from and written to the respective Vuex module. Each view and component accesses this data directly via getters

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
