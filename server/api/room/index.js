const
	express = require('express');

const
	controller = require('./room.controller'),
	router = express.Router();

router.route('')
	.post(controller.add);

router.route('/create')
	.get(controller.createRoom);

// router.route('/all')
// 	.get(controller.getAll);

module.exports = router;