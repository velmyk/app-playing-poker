const User = require('../user/user.model');

const joinPoker = (socket, data) => {
    console.log('joinPoker', data);
    User.findById(data.userId)
        .then(result => {
            console.log('joined', result);
            socket.broadcast.emit('newUser', {
                userId: result._id,
                userName: result.name
            });
        });
};

const selectMark = (socket, data) => {
    console.log('selectMark', data);
    socket.broadcast.emit('onMarkSelect', data)
}

module.exports = {
	joinPoker: joinPoker,
	selectMark: selectMark
};