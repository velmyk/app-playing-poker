'use strict';

const 	socketIo = require('socket.io');

const 	controller = require('./poker.controller');

const 	poker = (server) => {

    const 	io = socketIo.listen(server),
    		activeUsers = [];

    io.sockets.on('connection', (socket) => {

        socket.on('joinPoker', controller.joinPoker.bind(null, socket, activeUsers));

        socket.on('selectMark', controller.selectMark.bind(null, socket, activeUsers));
    });
};

module.exports = poker;