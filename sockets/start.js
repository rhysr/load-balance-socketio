const http = require('http');
const port = 3000;
const process = require('process');

const socketio = require('socket.io');
const server = http.createServer();

const io = socketio(server);
io.on('connection', (socket) => {
    socket.emit('news', { pid: process.pid });
});

server.listen(port, (err) => {
    if (err) {
        return console.log('uh oh', err);
    }

    console.log(`server is listening on ${port}`);
});
