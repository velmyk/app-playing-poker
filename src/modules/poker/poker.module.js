import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './pokerRoutes';

export default angular.module('app.poker', [uirouter])
    .config(routes)
    .name;