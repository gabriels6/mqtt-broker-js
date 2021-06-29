const aedes = require("aedes")();
const mq = require('mqemitter');
const httpServer = require("http").createServer();
const ws = require("websocket-stream");
const port = process.env.PORT || 1883

ws.createServer({ server: httpServer }, aedes.handle);

aedes.on('client', function(client) {
    console.log("Client connected! Id: " + client);

    client.publish("Server accepted connection!");
});

httpServer.listen(port, () => {
    console.log("Server listening...");
});