const aedes = require('aedes')();
const net = require('net');
const port = process.env.PORT || 1883;

const server = net.createServer(aedes.handle);

server.listen(port, () => {
    console.log("Server listening on port: ", port);
});

aedes.on('client', function (client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
});