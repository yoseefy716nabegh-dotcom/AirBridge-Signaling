const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    socket.on('signal', (data) => socket.broadcast.emit('signal', data));
});
server.listen(PORT);