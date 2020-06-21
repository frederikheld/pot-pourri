# webapp

## Project setup

```
npm install

```

## Build and Run

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## Quality Checks

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```

## CI/CD

This module comes with a GitHub action that runs the Quality Checks.

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### VSCode configuration

To enable Vue code highlighting in VSCode, install the extension _Vetur_. Unfortunately it doesn't resepct the linting settings in `.eslintrc.js`, therefore you need disable it in _Vetur_ and install the extension _Prettier_ to do the job.

To enable format on save and prevent _Vetur_ from doing the formatting, add the following lines to VSCode's `settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "vetur.format.enable": false
}
```

## Useful Links

- MQTT Client library in JS _Eclipse Paho_ How To: https://www.hivemq.com/blog/mqtt-client-library-encyclopedia-paho-js/
- Enable MQTT over websockets in _Mosquitto_: https://blog.ithasu.org/2016/05/enabling-and-using-websockets-on-mosquitto/
