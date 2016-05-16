'use strict';

const PORT = 3000;

var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');

var app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var server = http.createServer(app);

var io = require('socket.io')(server);


var messageLog = [];

io.on('connection', function(socket) {
  console.log('Client connected.');

  socket.emit('messageLog', messageLog);

  // receive new message from one client
  socket.on('newMessage', function(message) {
    console.log('message:', message);
    messageLog.push(message);

    // broadcast that message to all clients
    io.emit('chat', message);
  });

});



server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
