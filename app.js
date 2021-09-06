const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const { getUsersInChat, addUser, removeUser, getUser } = require('./users');
const io = require("socket.io")(http, {
    cors: {
      origin: "*"
    },
});

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {

    socket.on('newUser', ({ userName, userPhoto }) => {
        const user = {
            id: socket.id,
            userName,
            userPhoto
        };

        addUser(user);

        io.emit('usersInChat', getUsersInChat());
    });    

    socket.on('sendMessage', ({ id, messageText, messageImage }) => {
        const message = {
            id,
            author: getUser(socket.id),
            messageText,
            messageImage
        };        

        io.emit('newMessage', message);
    })

    socket.on('remove', id => {        
        io.emit('removeMessage', id);
    });

    socket.on('disconnect', () => {
        removeUser(socket.id);
        socket.broadcast.emit('usersInChat', getUsersInChat());
    });
});

http.listen(PORT, () => {
    console.log('Server is running, PORT:' + PORT);
});