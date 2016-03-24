'use strict';

const User = require('../user/user.model');

const joinPoker = (socket, activeUsers, data) => {
    console.log('joinPoker', data);
    if(!data.userId) return;
    socket.userId = data.userId;
    socket.room = data.room;
    console.log(data.userId);
    User.findById(data.userId)
        .then(user => {
            activeUsers[data.userId] = user;
            console.log(activeUsers);
            socket.join(data.room);
            socket.broadcast.to(socket.room).emit('newUser', activeUsers);
            socket.emit('newUser', activeUsers);
        });
};

const selectMark = (socket, activeUsers, data) => {
    console.log('selectMark', data);
    console.log(activeUsers);
    activeUsers[data.userId]['mark'] = data.mark
    console.log(socket.room);
    socket.broadcast.to(socket.room).emit('onMarkSelect', data)
    socket.emit('onMarkSelect', data)
};

const newStoryDescription = (socket, activeUsers, data) => {
    console.log('newStoryDescription', data);
    socket.broadcast.to(socket.room).emit('storyDescriptionChanged', data)
    socket.emit('storyDescriptionChanged', data)
};

const createRoom = (req, res) => {
    let roomId = new Date().getTime();
    res.send({
        id: roomId
    });
};

const joinRoom = (req, res) => {

};



module.exports = {
	joinPoker: joinPoker,
	selectMark: selectMark,
    newStoryDescription: newStoryDescription,
    createRoom: createRoom,
    joinRoom: joinRoom 
};