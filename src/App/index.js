const aedes = require('aedes')()
const { createServer } = require('aedes-server-factory')
const httpServer = require("http").createServer();
const ws = require("websocket-stream");
const port = process.env.PORT || 1883
const server = createServer(aedes)

ws.createServer({ server: httpServer }, aedes.handle);

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})

httpServer.listen(process.env.PORT || 3333, () => {
    console.log("Server listening...");
});