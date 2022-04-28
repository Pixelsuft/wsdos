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
const client = dgram.createSocket('udp4');

client.on('message', function(msg, rinfo) {
  ws.send(msg);
  // console.log(`[${rinfo.address}:${rinfo.port}] dosbox sent: ${msg}`);
});

ws.on('message', function message(data) {
  client.send(data, function(err) {
    if (err) {
      console.log(`could not connect to dosbox:\n${err}`);
      client.close();
    }
  });
  // console.log(`[${ADDRESS}] web sent: ${data}`);
});

ws.on('close', function close() {
  console.log(`disconnected from web at [${ADDRESS}]`);
});

ws.on('open', function() {
  client.connect(PORT, HOST, function(err) {
    if (err) {
      console.log(`could not connect to dosbox at [${HOST}:${PORT}]:\n${err}`);
      client.close();
    } else {
      console.log(`connected to dosbox at [${HOST}:${PORT}]`);
    }
  });
});
