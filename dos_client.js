const dgram = require('dgram');
const {
  WebSocket
} = require('ws');

if (process.argv.length <= 3) {
  console.log('usage: "' + process.argv[0] + '" "' + process.argv[1] + '" [WEBSOCKET_ADDRESS] [HOST:PORT]');
  process.exit();
}

const ADDRESS = process.argv[2];
const HOST = process.argv[3].split(':')[0];
const PORT = parseInt(process.argv[3].split(':')[1], 10);

const ws = new WebSocket(ADDRESS);
const server = dgram.createSocket('udp4');
var last_port;

server.on('message', function(msg, rinfo) {
  ws.send(msg);
  if (!last_port)
    last_port = rinfo.port;
  // console.log(`[${rinfo.address}:${rinfo.port}] dosbox sent: ${msg}`);
});

server.on('listening', function() {
  console.log(`listening at [${HOST}:${PORT}]`);
});

ws.on('message', function message(data) {
  if (last_port) {
    server.send(data, port = last_port, callback = function(err) {
      if (err) {
        console.log(`could not connect to dosbox:\n${err}`);
        client.close();
      }
    });
    // console.log(`[${ADDRESS}] web sent: ${data}`);
  } else {
    console.log(`[${ADDRESS}] web couldn't sent: ${data}`);
  }
});

ws.on('close', function close() {
  console.log(`disconnected from web at [${ADDRESS}]`);
});

ws.on('open', function() {
  console.log(`connected to [${ADDRESS}]`);
  server.bind(PORT);
});
