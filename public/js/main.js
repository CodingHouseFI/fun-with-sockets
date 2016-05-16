'use strict';

var socket, player;

$(() => {
  socket = io();

  socket.on('playerNum', playerNum => {
    player = playerNum;
    $('#status').text(`Waiting for opponent.`);
  });

  socket.on('gameStart', () => {
    if(player) {
      $('#rpsButtons').show();
      $('#status').text(`Rock Paper Scissors!!!`);
    }
  });

  $('button.rpsButton').on('click', makeSelection);
});

function makeSelection(e) {
  $('.rpsButton').off('click');
  $(e.target).addClass('active');

  var selection = $(e.target).data('rps');
  socket.emit('selection', selection);

}

