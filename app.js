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

io.on('connection', function(socket) {
  console.log('Client connected.');
  socket.on('data', function(data) {
    console.log('data:', data);
    var colors = ['blue', 'red', 'yellow'];
    var index = Math.floor(Math.random() * colors.length);
    socket.emit('color', colors[index]);
  });


});

server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
