const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: { origin: "*" }
});

// Render will provide the PORT
const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('Device connected:', socket.id);

    // Relay signaling data between peers
    socket.on('signal', (data) => {
        socket.broadcast.emit('signal', data);
    });

    socket.on('disconnect', () => {
        console.log('Device disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});