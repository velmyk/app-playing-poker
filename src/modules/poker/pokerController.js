export default class PokerController {
    constructor(PokerService) {
        'ngInject';

        this.PokerService = PokerService;
    }

    createRoom() {
        this.PokerService.createRoom();
    }

}
