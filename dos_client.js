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
var last_port;

const ws = new WebSocket(ADDRESS);
const server = dgram.createSocket('udp4');

server.on('message', function(msg, rinfo) {
  ws.send(msg);
  if (!last_port)
    last_port = rinfo.port;
  // console.log(`[${rinfo.address}:${rinfo.port}] dosbox sent: ${msg}`);
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

ws.on('open', function() {
  server.bind(PORT);
});
