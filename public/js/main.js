'use strict';

// connects to socket server
var socket = io();
// socket is the connection

socket.on('color', function(color) {
  console.log('color:', color);
  $('body').css('background-color', color);
});

$(() => {
  $('#myButton').click(clickButton);
});

function clickButton() {
  socket.emit('data', {key: 'value'});
}

