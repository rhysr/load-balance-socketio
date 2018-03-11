const messageNode  = document.getElementById('connection-status');
var updateStatus = (message) => {
    messageNode.innerHTML = message;
};

//TODO: all the error handling
const socket  = io(
    'ws://' + window.location.hostname + ':3000', {
        // Only use websockets, as the upgrade from long polling
        // is hard to stickily load balance
        transports: ['websocket']
    }
);

socket.on('connection-ack', (data) => {
    updateStatus(`Socket ${socket.id} connected to server "${data.server}"`);
});

socket.on('connect_error', () => {
    updateStatus('There was an error connecting to the server');
});

socket.on('disconnect', () => {
    updateStatus('Disconnected from server');
});