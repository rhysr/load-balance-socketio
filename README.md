## Getting Started

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

# Load balancing
Each socket will connect to a backend node socket daemon
The name of the socket process will be reported in the UI.

The load balancing proxy uses the ip as a consistent backend target.
So, to see different backend proceses being used, you have to the view the app
from different IPs.

This is because Socket.io initially establishes a long polling request, which it
then upgrades to a better connection. 
https://socket.io/docs/client-api/#with-websocket-transport-only

Ideally, we'd want the backend socket "stickiness" to be per client socket.
We need some way of identifying an individual socket connection, or use pure 
websockets without the long polling request and load balance using the 
Sec-WebSocket-Key header

## Application Development Mode Tool

This skeleton comes with [zf-development-mode](https://github.com/zfcampus/zf-development-mode).
It provides a composer script to allow you to enable and disable development mode.

### To enable development mode

**Note:** Do NOT run development mode on your production server!

```bash
$ composer development-enable
```

**Note:** Enabling development mode will also clear your configuration cache, to
allow safely updating dependencies and ensuring any new configuration is picked
up by your application.

### To disable development mode

```bash
$ composer development-disable
```

### Development mode status

```bash
$ composer development-status
```

## Configuration caching

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
