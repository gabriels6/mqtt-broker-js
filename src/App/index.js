const aedes = require('aedes')();
const httpServer = require('http').createServer();
const ws = require('websocket-stream');

const cors = require("cors");
const express = require("express");
const routes = require("../Routes");

const port = process.env.PORT || 1883;

const app = express()

app.use(cors());
app.use(express.json());
app.use(routes);

ws.createServer({server: app }, aedes.handle);


app.listen(port, () => {
    console.log("Server listening on port: ", port);
});

aedes.on('client', function (client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
});

aedes.on('connectionError', function(client,error){
    console.log('Connection error on client: '+(client ? client.id : client)+'; Error:' + error)
});

aedes.on('clientError', function(client,error){
    console.log('Client error on client: '+(client ? client.id : client)+'; Error:' + error)
})

aedes.authenticate = function(client,username,password,callback){

    console.log('Client authenticated: ' + (client ? client.id : client));

    callback(null,true);
}

aedes.authorizePublish = function(client,packet,callback){
    callback(null);
}

aedes.authorizeSubscribe = function(client,subscription,callback){
    callback(null,subscription);
}