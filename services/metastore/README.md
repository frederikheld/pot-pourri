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

## Dev Tools

This package comes with a couple of _npm_ scripts. Most of them come in different variations. The general pattern is, that the appendix `:dev` means, that this script is optimized to streamline your local development experience. In most cases this means, that it has a watcher that auto-runs the script when files have been updated. The non-appended variation is optimized for single-runs like in your _CI_ environment.

### Run in dev mode

While developing, you need to re-start the server if you make changes. This happens automatically with `$ npm run start:dev`.

**Note:** This will run the node application directly, not inside a _Docker_ container!

### Testing

This package uses _Mocha_ with _Chai_ as testing framework and _Istanbul (nyc)_ to measure coverage. It comes with a couple of _npm_ scripts to run tests and generate coverage reports.

### Linting

This package comes with _eslint_ support. This includes the eslint dev dependencies, eslint config and _npm_ scripts to run the linter.

It also comes with an `.vscode` config to integrate eslint into _VSCode_. In order to use this, you need to install [Dirk Baeumer's _vscode-eslint_ extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). 

**Note:** _VSCode_ ignores `.vscode` configs in sub-directories. So make sure that you open `services/metastore` directory in _VSCode_ to make it the project root.