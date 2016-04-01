export default class HeaderController {
    constructor(IdentityStore) {
        'ngInject';

        this.IdentityStore = IdentityStore;
    }

    getCurrentUserName() {
    	return this.IdentityStore.get().name || 'guest';
    }

    getCurrentUserId() {
    	return this.IdentityStore.get()._id;
    }
}
