import landingTemplate from './landing.html';

export default function loginRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('main.landing', {
            url: '/',
            views: {
            	'content@main': {
            		template: landingTemplate
            	}
            }
        });
}