var net = require('net');
var mqttConnection = require('mqtt-connection');
var server = new net.Server();

server.on('connection', (stream) => {

    var client = mqttConnection(stream);

    client.on('connect', function(packet){
        console.log("client connected")
        client.connack({returnCode:0});
    });

    client.on('publish', function(packet){
        client.puback({messageId: packet.messageId});
    });

    client.on('pingreq', function(){
        client.pingresp();
    });

    client.on('subscribe', function (packet) {
        client.suback({ granted: [packet.qos], messageId: packet.messageId});
    });

    stream.setTimeout(1000 * 60 * 3);

    client.on('close', function() { client.destroy() });
    client.on('error', function() { client.destroy() });
    client.on('disconnected', function() { client.destroy(); });

    stream.on('timeout', function() { client.destroy() ;});
});

server.listen(process.env.PORT || 1883);