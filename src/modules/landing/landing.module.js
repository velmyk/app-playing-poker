import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './landingRoutes';

export default angular.module('app.landing', [uirouter])
    .config(routes)
    .name;