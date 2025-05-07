# trashcan2-server

The "backend" for the trashcans

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

A few of the config values can be changed (on startup) by setting environment variables.\
To have them take effect set `ALLOW_CONFIG_MUTATIONS` to `'true'`.

> Upper- or lowercase doesn't matter with any variable

### Log level

The variable `LOG_LEVEL` determines wich logs are logged.
Possible values are:

- debug
- info
- warn
- error

### Timestamps

The variable `TIMESTAMP_ENABLED` defines if timestamps are enabled (duh).\
Boolean, `true` or `false`. Timestamp format:

```plaintext
[dd-MM-yyyy_HH:mm:ss]

[06-03-2025_17:55:20]
```
