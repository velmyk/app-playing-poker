import loginTemplate from './login.html';
import LoginController from './LoginController';

export default function loginRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('login', {
            url: '/login',
            template: loginTemplate,
            controller: LoginController,
            controllerAs: 'loginCtrl'
        });
}