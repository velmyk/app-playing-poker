import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './settingsRoutes';

export default angular.module('app.settings', [uirouter])
    .config(routes)
    .name;