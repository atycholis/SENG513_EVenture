window.addEventListener("beforeunload", function(event) {
  socket.emit('user disconnect', '');
});