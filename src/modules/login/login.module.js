import angular from 'angular';
import uirouter from 'angular-ui-router';

import LoginService from './LoginService';
import routes from './loginRoutes';

export default angular.module('app.login', [uirouter])
	.service('LoginService', LoginService)
    .config(routes)
    .name;