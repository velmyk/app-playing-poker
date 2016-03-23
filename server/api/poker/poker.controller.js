'use strict';

const User = require('../user/user.model');

const joinPoker = (socket, activeUsers, data) => {
    console.log('joinPoker', data);
    User.findById(data.userId)
        .then(user => {
            var newComer = !activeUsers.some(nuser => {
                return nuser.userId == user._id.toString();
            });
            if (newComer){
                activeUsers.push({
                    userId: user._id,
                    userName: user.name,
                    mark: ''
                });
            }
            socket.broadcast.emit('newUser', activeUsers);
            socket.emit('newUser', activeUsers);
        });
};

const selectMark = (socket, activeUsers, data) => {
    console.log('selectMark', data);
    activeUsers.forEach(user => {
        if(user.userId == data.userId) user.mark = data.mark;
    });
    socket.broadcast.emit('onMarkSelect', data)
    socket.emit('onMarkSelect', data)
};

const newStoryDescription = (socket, activeUsers, data) => {
    console.log('newStoryDescription', data);
    socket.broadcast.emit('storyDescriptionChanged', data)
    socket.emit('storyDescriptionChanged', data)
};

module.exports = {
	joinPoker: joinPoker,
	selectMark: selectMark,
    newStoryDescription: newStoryDescription
};