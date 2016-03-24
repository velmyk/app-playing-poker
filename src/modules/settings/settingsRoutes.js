import settingsTemplate from './settings.html';
import SettingsController from './SettingsController';

export default function loginRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('main.settings', {
            url: '/settings',
            views: {
            	'content@main': {
            		template: settingsTemplate,
            		controller: SettingsController,
            		controllerAs: 'settingsCtrl'
            	}
            }
        });
}