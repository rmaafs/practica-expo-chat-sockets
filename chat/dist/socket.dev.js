"use strict";

var express = require('express');

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

var messages = [{
  text: "Que tal",
  author: "Sergio"
}];
app.use(express["static"]('public/'));
app.get('/hola', function (req, res) {
  res.status(200).send("hola mundo!");
});
io.on('connection', function (socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);
  socket.on('new-message', function (data) {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});
server.listen(3000, function () {
  console.log("Servidor corriendo en http://localhost:3000");
});