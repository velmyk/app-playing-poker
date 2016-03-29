const
    User = require('../user/user.model');

const
    joinPoker = (socket, activeUsers, data) => {
        if(!data.userId) return;
        socket.userId = data.userId;
        socket.room = data.room;
        if(!activeUsers[data.room]) activeUsers[data.room] = {};
        User.findById(data.userId)
            .then(user => {
                activeUsers[data.room][data.userId] = user;
                socket.join(data.room);
                socket.broadcast.to(socket.room).emit('newUser', activeUsers[socket.room]);
                socket.emit('newUser', activeUsers[socket.room]);
            })
            .catch(err => {
                console.log(err);
            });
    };

const
    selectMark = (socket, activeUsers, data) => {
        activeUsers[socket.room][data.userId]['mark'] = data.mark
        socket.broadcast.to(socket.room).emit('onMarkSelect', data)
        socket.emit('onMarkSelect', data)
    };

const
    newStoryDescription = (socket, activeUsers, data) => {
        socket.broadcast.to(socket.room).emit('storyDescriptionChanged', data)
        socket.emit('storyDescriptionChanged', data)
    };

const 
    userDisconnected = (socket, activeUsers, data) => {
        delete activeUsers[socket.room][socket.userId];
        socket.broadcast.to(socket.room).emit('newUser', activeUsers[socket.room]);
        socket.leave(socket.room);
    };

module.exports = {
	joinPoker: joinPoker,
	selectMark: selectMark,
    newStoryDescription: newStoryDescription,
    userDisconnected: userDisconnected
};