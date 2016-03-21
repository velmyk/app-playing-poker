
'use strict';

const express = require('express');
const controller = require('./user.controller');
const router = express.Router();

router.route('/me')
	.get(controller.me);

router.route('')
    .get(controller.get)
    .post(controller.add);

router.route('/:id')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.remove);

module.exports = router;