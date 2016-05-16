'use strict';

var socket;

$(() => {
  socket = io();

  socket.on('messageLog', function(messageLog) {
    var $lis = messageLog.map(makeMessageElement);
    $('#messages').append($lis);
  });

  socket.on('chat', function(message) {
    var $li = makeMessageElement(message);
    $('#messages').append($li);
  });

  $('#send').click(sendMessage);
});

function sendMessage() {
  var name = $("#name").val();
  var text = $('#newMessage').val();
  $('#newMessage').val('');

  socket.emit('newMessage', {
    name: name,
    text: text
  });
}

function makeMessageElement(message) {
  return $('<li>').text(`${message.name} - ${message.text}`);
}

