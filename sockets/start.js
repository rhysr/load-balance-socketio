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

const pushLog = (message) => {
    io.to('logs').emit('log', message);
};

io.on('connection', (socket) => {
    // Tell socket which server it's connected to
    // Only useful to visualise load balancing
    socket.emit('connection-ack', { server: label });

    // Sign up any sockets that want logs
    socket.on('log-subscribe', () => {
        socket.join('logs');
    });
    pushLog(`${socket.id} has connected to ${label}`);
});

server.listen(port, (err) => {
    if (err) {
        return console.log('uh oh', err);
    }

    console.log(`server is listening on ${port}`);
});
