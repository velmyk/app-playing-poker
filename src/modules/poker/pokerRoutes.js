import pokerTemplate from './poker.html';
import PokerController from './PokerController';

export default function pokerRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('poker', {
            url: '/poker',
            template: pokerTemplate,
            controller: PokerController,
            controllerAs: 'pokerCtrl'
        });

}