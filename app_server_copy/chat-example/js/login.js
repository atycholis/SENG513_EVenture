var socket = io();

var online_users = document.getElementById('online-users');
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

// TODO: session id
// TODO: color
// TODO: custom username
// TODO: scroll up
// TODO: color/username command

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('user creation', input.value);
    input.value = '';
  }
});

socket.on('user creation success', function(msg) {
  window.location.replace('http://localhost:3000/chat');
});
