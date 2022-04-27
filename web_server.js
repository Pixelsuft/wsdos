const {
  WebSocketServer
} = require('ws');

if (process.argv.length <= 2) {
  console.log('usage: "' + process.argv[0] + '" "' + process.argv[1] + '" [PORT]');
  process.exit();
}

const PORT = parseInt(process.argv[2], 10);
const wss = new WebSocketServer({
  port: PORT
});
var dos_server;
var dos_client;

wss.on('connection', function connection(ws) {
  if (!dos_server) {
    dos_server = ws;
    ws.on('message', function message(data) {
      if (dos_client) {
        dos_client.send(data);
        // console.log('server sent: ' + data);
      } else {
        console.log('could not send data to the client: ' + data);
      }
    });
    console.log('host connected');
  } else if (!dos_client) {
    dos_client = ws;
    ws.on('message', function message(data) {
      if (dos_server) {
        dos_server.send(data);
        // console.log('client sent: ' + data);
      } else {
        console.log('could not send data to the server: ' + data);
      }
    });
    console.log('client connected');
  } else {
    console.log('wtf? users > 2!');
  }
});

console.log('listening on :' + PORT);
