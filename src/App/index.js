const aedes = require('aedes')();
const httpServer = require('http').createServer();
const ws = require('websocket-stream');
const port = process.env.PORT || 1883;

ws.createServer({server: httpServer }, aedes.handle);

httpServer.listen(port, () => {
    console.log("Server listening on port: ", port);
});

aedes.on('client', function (client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
});