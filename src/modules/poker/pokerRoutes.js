import pokerTemplate from './poker.html';
import PokerController from './PokerController';

export default function pokerRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('main.poker', {
            url: '/poker',
            views: {
            	'content@main': {
            		template: pokerTemplate,
		            controller: PokerController,
		            controllerAs: 'pokerCtrl'
            	}
            }
        });

}