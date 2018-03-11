const logNode = document.getElementById('log');
console.log(logNode);

const addLog = (message) => {
    let messageNode = document.createElement('li');
    messageNode.appendChild(document.createTextNode(message));
    logNode.insertBefore(messageNode, logNode.firstChild);
};


const target = 'ws://' + location.hostname+(location.port ? ':'+location.port: '');

const socket = io(
    target, {
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
