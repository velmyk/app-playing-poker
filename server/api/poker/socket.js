'use strict';

const 	socketIo = require('socket.io');

const 	controller = require('./poker.controller');

const 	poker = (server) => {

    const 	io = socketIo.listen(server),
    		rooms = [],
    		activeUsers = [],
    		poker = io.of('/room');

    poker.on('connection', (socket) => {
        console.log(socket);

    	// socket.join();

        socket.on('joinPoker', controller.joinPoker.bind(null, socket, activeUsers));

        socket.on('selectMark', controller.selectMark.bind(null, socket, activeUsers));

        socket.on('newStoryDescription', controller.newStoryDescription.bind(null, socket, activeUsers));
    });
};

module.exports = poker;

// class Room {
// 	constructor(id) {
// 		this.
// 	}
// }