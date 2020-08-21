# Metastore

This service stores meta information about plants and devices. Information can be accessed and manipulated via a REST API.

> Note: This is currently being developed and not ready for production yet!

## Run

This service is being run with Docker. It comes with a `docker-compose` file that follows the _Pot Purri_ service pattern.

To start the service, run:

```sh
$ docker-compose up -d
```

To stop the service, run:

```sh
$ docker-compose down
```

To re-build the container before you start it, you have to run:

```sh
$ docker-compose build
$ docker-compose up -d
```

## API Design
All entities served by _metastore_ have an first-level endpoint. The plural noun will return the set of entities:

```sh
/plants
/devices
```

<!--
If no query given, the full set will be returned. Queries can be used to request a specific subset. The query string has to be escaped following the rules of [`querystring.stringify()`](https://nodejs.org/api/querystring.html#querystring_querystring_stringify_obj_sep_eq_options).

```sh
/devices/?id=1&id=5
```
//-->
The plural noun followed by an id will return the specific entity:

```sh
/plant/:id
/devices/:id
```

Linked ressources are marked with _linked-_ before the noun. `POST` on such paths will not create a new sub-ressource, but link an existing first-level ressource. The request body is the _id_ of the ressource to be linked. It is possible to pass a list of _ids_.

```sh
/plant/:id/linked-devices
```


## Dev Tools

This package comes with a couple of _npm_ scripts. Most of them come in different variations. The general pattern is, that the appendix `:dev` means, that this script is optimized to streamline your local development experience. In most cases this means, that it has a watcher that auto-runs the script when files have been updated. The non-appended variation is optimized for single-runs like in your _CI_ environment.

### Run in dev mode

While developing, you need to re-start the server if you make changes. This happens automatically with `$ npm run start:dev`.

**Note:** This will run the node application directly, not inside a _Docker_ container!

### Testing

This package uses _Mocha_ with _Chai_ as testing framework and _Istanbul (nyc)_ to measure coverage. It comes with a couple of _npm_ scripts to run tests and generate coverage reports.

To test interaction with MongoDB, this package uses _mongodb-memory-server_. There's an configuration option in `package.json` that tells _mongodb-memory-server_ which binary to use. Make sure that it is the same version as you use for MongoDB in production. The version for production is configured in `docker-compose.yml`.

### Linting

This package comes with _eslint_ support. This includes the eslint dev dependencies, eslint config and _npm_ scripts to run the linter.

It also comes with an `.vscode` config to integrate eslint into _VSCode_. In order to use this, you need to install [Dirk Baeumer's _vscode-eslint_ extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). 

**Note:** _VSCode_ ignores `.vscode` configs in sub-directories. So make sure that you open `services/metastore` directory in _VSCode_ to make it the project root.

### Useful links

#### Best Practice in API Design

* [https://restfulapi.net/http-methods/](https://restfulapi.net/http-methods/)
* [https://restfulapi.net/resource-naming/](https://restfulapi.net/resource-naming/)
* [https://www.restapitutorial.com/httpstatuscodes.html](https://www.restapitutorial.com/httpstatuscodes.html)
* [RESTful API Design: 13 Best Practices to Make Your Users Happy](https://florimond.dev/blog/articles/2018/08/restful-api-design-13-best-practices-to-make-your-users-happy/)

#### API Queries

* [Node.js querystring](https://nodejs.org/api/querystring.html) (this is the [_query parser_ used by _express_](https://expressjs.com/en/api.html#app.settings.table))