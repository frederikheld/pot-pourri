# webapp

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

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
