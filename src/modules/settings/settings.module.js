import angular from 'angular';
import uirouter from 'angular-ui-router';

import SettingsService from './SettingsService';
import routes from './settingsRoutes';

export default angular.module('app.settings', [uirouter])
	.service('SettingsService', SettingsService)
    .config(routes)
    .name;