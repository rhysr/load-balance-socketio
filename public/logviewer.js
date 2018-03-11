const logNode = document.getElementById('log');
console.log(logNode);

const addLog = (message) => {
    let messageNode = document.createElement('li');
    messageNode.appendChild(document.createTextNode(message));
    logNode.insertBefore(messageNode, logNode.firstChild);
};

const socket = io(
    'ws://' + window.location.hostname + ':3000', {
        // Only use websockets, as the upgrade from long polling
        // is hard to stickily load balance
        transports: ['websocket']
    }
);

socket.on('connect', () => {
    socket.emit("log-subscribe");
    socket.on('log', (message) => {
        addLog(message);
    });
});
