import angular from 'angular';

import IdentityStore from './IdentityStore';

export default angular.module('app.auth', [])
    .service('IdentityStore', IdentityStore)
    .name;
