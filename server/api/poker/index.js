const
	express = require('express');

const
	controller = require('./poker.controller'),
	router = express.Router();

router.route('/room/create')
	.get(controller.createRoom);

router.route('/room/join')
	.get(controller.joinRoom);

module.exports = router;