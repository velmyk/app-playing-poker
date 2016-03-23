import io from 'socket.io-client/socket.io.js';

export default class SocketService {
    constructor($rootScope) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.socket = io.connect('/room');
    }

    on(eventName, callback) {
        function wrapper() {
            let args = arguments;
            this.$rootScope.$apply(() => {
                callback.apply(this.socket, args);
            });
        }

        this.socket.on(eventName, wrapper.bind(this));

        return function () {
            socket.removeListener(eventName, wrapper);
        };
    }

    emit(eventName, data, callback) {
        this.socket.emit(eventName, data, () => {
            let args = arguments;
            this.$rootScope.$apply(() => {
                if(callback) {
                    callback.apply(this.socket, args);
                }
            });
        });
    }
}
