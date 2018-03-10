# How do you load balance socket.io backend instances???

`¯\_(ツ)_/¯`

## Setup

Get docker-compose from [here](https://docs.docker.com/compose/install/) if you don't want sudo some random script...

Build nginx and node docker images
```bash
sudo ./docker-compose build
```

Start nginx and node socketio containers
```bash
sudo ./docker-compose up
```

Then, in a different terminal start the php application
> ```bash
> $ composer run --timeout=0 serve
> ```
You can then browse to http://localhost:8080.

## Load balancing
Each socket will connect to a backend node socket daemon.
The name of the socket process will be reported in the UI.

In order to provide an even distribution of client amongst the backend servers, two things have been done.

1. The clients will only connect using websockets. Socket.io initially establishes a long polling connection which it then upgrades to a websocket connection [1](https://socket.io/docs/client-api/#with-websocket-transport-only). Currently, I'm not sure of a way to reliably ensure that the "Upgrade" request will hit the correct backend server.
2. Instead of using the ip as the backend stickiness sharding key, we can now use the Sec-WebSocket-Key header.  This is unique to each connection so should provide even distribution of backend server connections, which is far better than sharding by IP.


## Expressive skeleton setup noise
TODO: remove
### Application Development Mode Tool

This skeleton comes with [zf-development-mode](https://github.com/zfcampus/zf-development-mode).
It provides a composer script to allow you to enable and disable development mode.

#### To enable development mode

**Note:** Do NOT run development mode on your production server!

```bash
$ composer development-enable
```

**Note:** Enabling development mode will also clear your configuration cache, to
allow safely updating dependencies and ensuring any new configuration is picked
up by your application.

#### To disable development mode

```bash
$ composer development-disable
```

#### Development mode status

```bash
$ composer development-status
```

### Configuration caching

By default, the skeleton will create a configuration cache in
`data/config-cache.php`. When in development mode, the configuration cache is
disabled, and switching in and out of development mode will remove the
configuration cache.

You may need to clear the configuration cache in production when deploying if
you deploy to the same directory. You may do so using the following:

```bash
$ composer clear-config-cache
```

You may also change the location of the configuration cache itself by editing
the `config/config.php` file and changing the `config_cache_path` entry of the
local `$cacheConfig` variable.
