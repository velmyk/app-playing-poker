
'use strict';

const 	express = require('express');

const 	auth = require('./auth/auth.service'),
		router = express.Router();

router
	.use('/user',/* auth.isAuthenticated(),  */require('./user'))
	.use('/auth', require('./auth'));

module.exports = router;