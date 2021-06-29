const aedes = require('aedes')()
const { createServer } = require('aedes-server-factory')
const port = process.env.PORT || 1883

const server = createServer(aedes)

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})


// const mq = require('mqemitter');
// const httpServer = require("http").createServer();
// const ws = require("websocket-stream");
// const port = process.env.PORT || 1883;

// const aedes = require("aedes")();

// ws.createServer({ server: httpServer }, aedes.handle);

// httpServer.listen(port, () => {
//     console.log("Server listening...");
// });