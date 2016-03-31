const
	express = require('express');

const
	controller = require('./user.controller'),
	router = express.Router();

router.route('/me')
	.get(controller.me);

router.route('')
    .get(controller.get)
    .post(controller.add);

router.route('/:id')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.remove);

router.route('/updateImage')
	.post(controller.fetchFile('file'), controller.updateImage);

module.exports = router;