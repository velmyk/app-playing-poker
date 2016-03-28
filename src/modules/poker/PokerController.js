export default class PokerController {
    constructor(PokerService,
    			IdentityStore) {
        'ngInject';

        this.PokerService = PokerService;
        this.IdentityStore = IdentityStore;
    }

    createRoom() {
        this.PokerService.createRoom();
    }

    createRoomDisabled() {
    	return !this.IdentityStore.get()._id;
    }

}
