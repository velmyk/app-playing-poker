import loginTemplate from './login.html';
import LoginController from './LoginController';

export default function loginRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('main.login', {
            url: '/login',
            views: {
            	'content@main': {
            		template: loginTemplate,
            		controller: LoginController,
            		controllerAs: 'loginCtrl'
            	}
            }
        });
}