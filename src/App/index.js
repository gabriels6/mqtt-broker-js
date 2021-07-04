const aedes = require('aedes');
const { protocolDecoder } = require('aedes-protocol-decoder');

const broker = aedes({
    preConnect: function (client,packet,done){
        if(client.connDetails && client.connDetails.ipAddress) {
            client.ip = client.connDetails.ipAddress;
        }
        return done(null,true);
    }
})

const httpServer = require('aedes-server-factory').createServer(broker,{
    ws:true,
    trustProxy:true,
    protocolDecoder
});

const port = process.env.PORT || 1883;


httpServer.listen(port, () => {
    console.log("Server listening on port: ", port);
});

broker.on('client', function (client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
});

broker.on('connectionError', function(client,error){
    console.log('Connection error on client: '+(client ? client.id : client)+'; Error:' + error)
});

broker.on('clientError', function(client,error){
    console.log('Client error on client: '+(client ? client.id : client)+'; Error:' + error)
})

broker.authenticate = function(client,username,password,callback){

    console.log('Client authenticated: ' + (client ? client.id : client));

    callback(null,true);
}

broker.authorizePublish = function(client,packet,callback){
    callback(null);
}

broker.authorizeSubscribe = function(client,subscription,callback){
    callback(null,subscription);
}