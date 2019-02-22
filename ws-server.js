// Websocket server setup

const WebSocket = require('ws');

// Create an http server
let server = require('http').createServer();
let app = require('./server');

// Create a Websocket Server
const wss = new WebSocket.Server({ server: server });

// Mount app on the http server
server.on('request', app);

wss.on('connection', function connection(ws) {

    console.log("---------------------------");
    console.log("Chat client connected");
    console.log("---------------------------");

    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
        });
    });
    
});

// Configure port
const port = process.env.PORT || 5000;

server.listen(port, function() {
    console.log(`Http/Ws server listening on ${port}`);
});