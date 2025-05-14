# trashcan2-server

The "backend" for the trashcans

## Table of contents

<!-- toc -->

- [Development](#development)
- [Deployment](#deployment)
  - [Log level](#log-level)
  - [Timestamps](#timestamps)
- [API](#api)

<!-- tocstop -->

## Development

Run the server in local environment

```console
npm run dev
```

Run eslint for code quality testing

```console
npm run lint
```

Automatically fix found eslint issues

```console
npm run lint-fix
```

## Deployment

All config values can be changed (on startup) by setting environment variables.

> Should work - might have to put a envvars.yaml or something into config/, wont test rn.

### Log level

The variable `LOG_LEVEL` determines wich logs are logged.
Possible values are:

- debug
- info
- warn
- error

### Timestamps

The variable `TIMESTAMP_ENABLED` defines if timestamps are enabled (duh).
Boolean, `true` or `false`. Timestamps are formatted as standard ISO strings.

## API

The current production API documentation can be found [here](http://api.wurstkatze.eu/v1/docs).

The local API documentation is available under [http://localhost:4000/v1/docs](http://localhost:4000/v1/docs).
