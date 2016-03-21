export default class HeaderController {
    constructor(IdentityStore) {
        'ngInject';

        this.IdentityStore = IdentityStore;
    }

    getCurrentUser() {
    	return this.IdentityStore.get().name || 'guest';
    }
}
