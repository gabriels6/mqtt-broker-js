const aedes = require('aedes')()
const { createServer } = require('aedes-server-factory')
const httpServer = require("http").createServer();
const ws = require("websocket-stream");
const port = process.env.PORT || 1883

ws.createServer({ server: httpServer }, aedes.handle);

httpServer.listen(port, () => {
    console.log("Server listening on port: ", port);
});