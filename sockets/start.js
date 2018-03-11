const http = require('http');
const port = 3000;
const process = require('process');

const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis');

const server = http.createServer();

if ('undefined' === typeof process.env.LABEL) {
    console.error('No LABEL environment variable set');
    process.exit(1);
}
const label = process.env.LABEL;

const io = socketio(server);
io.adapter(redisAdapter({ host: 'redis', port: 6379 }));

io.on('connection', (socket) => {
    socket.emit('news', { socket_name: label });
    socket.on('socket-log', (data) => {
        let msg = 'Socket ' + data.name + ' is connected to server ' + label;
        socket.broadcast.emit('global-log', msg);
    });
});

server.listen(port, (err) => {
    if (err) {
        return console.log('uh oh', err);
    }

    console.log(`server is listening on ${port}`);
});
