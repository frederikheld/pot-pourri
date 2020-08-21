# MQTT tools

Collection of tools that help to debug mqtt communication.

## Usage

```sh
$ npm run <command>
```

Each command has a help page that explains it's individual configuration options.

```sh
$ npm run <command> -- --help
```

Note that you have to separate your arguments with a double-dash in order to pass them to your command. Otherwise they would be passed to `npm`!

## Available commands

|command|purpose|
|-|-|
|send|Send fake sensor data via MQTT in a defined interval|
|log|Log messages received on the specified topic(s)|