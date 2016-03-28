import rootTemplate from './main.html';
import headerTemplate from './header.html';
import HeaderController from './HeaderController';

export default function mainRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('main', {
            url: '',
            abstract: true,
            views: {
                '': {
                    template: rootTemplate
                },
                'header@main': {
                    template: headerTemplate,
                    controller: HeaderController,
                    controllerAs: 'headerCtrl'
                },
                'content@main': {
                    template: '<div>Main</div>'
                }
            },
            onEnter: function($http, IdentityStore, $cookies){
                'ngInject';
                if($cookies.get('token')) {
                    $http.get('/api/user/me')
                    .then(response => {
                        IdentityStore.update(response.data);
                    });
                }
                

            }
        });

};
