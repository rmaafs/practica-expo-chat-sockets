"use strict";

var socket = io.connect('http://localhost:3000', {
  'forceNew': true
});
socket.on('messages', function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data.map(function (elem, index) {
    return "<div>\n            <strong>".concat(elem.author, "</strong>: \n            <em>").concat(elem.text, "</em> </div>");
  }).join(" ");
  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };
  socket.emit('new-message', message);
  return false;
}