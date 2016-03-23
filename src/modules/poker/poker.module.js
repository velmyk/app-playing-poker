import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './pokerRoutes';
import PokerService from './PokerService';

export default angular.module('app.poker', [uirouter])
	.service('PokerService', PokerService)
    .config(routes)
    .name;