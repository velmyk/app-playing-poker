import MemoryStore from '../shared/store/MemoryStore';

export default class IdentityStore extends MemoryStore {
    constructor() {
        'ngInject';

        super();
    }
}