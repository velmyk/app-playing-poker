import angular from 'angular';

import SocketService from './socket/SocketService';
import MemoryStore from './store/MemoryStore';

export default angular.module('shared', [])
	.service('SocketService', SocketService)
	.service('MemoryStore', MemoryStore)
    .name;