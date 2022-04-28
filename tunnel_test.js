const dgram = require('dgram');

const server = dgram.createSocket('udp4');
const client = dgram.createSocket('udp4');
var last_port = 0;

server.on('error', function(err) {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', function(msg, rinfo) {
  last_port = rinfo.port;
  last_host = rinfo.address;
  console.log(`[${last_host}:${last_port}] client sent: ${msg}`);
  client.send(msg, (err) => {
    if (err) {
      console.log(`server error:\n${err}`);
      server.close();
    }
  });
});

client.on('message', function(msg, rinfo) {
  console.log(`[${rinfo.address}:${rinfo.port}] server sent: ${msg}`);
  server.send(msg, port = last_port, callback = function(err) {
    if (err) {
      console.log(`client error:\n${err}`);
      client.close();
    }
  });
});

server.on('listening', function() {
  client.connect(1234, '192.168.0.107', function(err) {
    if (err) {
      console.log(`client error:\n${err}`);
      client.close();
    }
  });
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(1236);
