import pokerRoomTemplate from './room/poker-room.html';
import PokerRoomController from './room/PokerRoomController';
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
        })
        .state('main.poker.room', {
            url: '/room/:id',
            views: {
            	'content@main': {
            		template: pokerRoomTemplate,
		            controller: PokerRoomController,
		            controllerAs: 'pokerRoomCtrl'
            	}
            },
            onEnter: function(SocketService, $stateParams) {
                'ngInject';

                SocketService.connect($stateParams.id);

            },
            onExit: function(SocketService) {
                'ngInject';

                SocketService.disconnect();

            }
        });

}