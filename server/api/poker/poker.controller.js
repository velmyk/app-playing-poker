const User = require('../user/user.model');

const joinPoker = (socket, data) => {
    User.findById(data.userId)
        .then(result => {
            socket.broadcast.emit('newUser', {
                userId: data.userId,
                userName: result.name
            });
        });
};

const selectMark = (socket, data) => {
    socket.broadcast.emit('onMarkSelect', data)
}

module.exports = {
	joinPoker: joinPoker,
	selectMark: selectMark
};