export default class PokerController {
    constructor() {
        'ngInject';

        this.socket = new WebSocket('ws:localhost:9000/poker');

        this.socket.onmessage(this.socketHandler);
    }

    socketHandler(event) {
        switch(event.data.message) {
            case 'newUser':
                this.newUser(event.data);

            case 'onMarkSelect':
                this.onSomeoneMarkSelect(event.data);
                
            default:
                break;
        }
    }

    newUser(user) {
        this.users.push(user);
    }

    onSomeoneMarkSelect(data) {
        this.users[data.userId][mark] = data.mark;
    }

    joinPoker() {
        socket.emit('joinPoker', {
            userId: currentUserId
        });
    }

    onMarkSelect(mark) {
        this.socket.emit('selectMark', {
            userId: currentUserId,
            mark: mark
        });
    }
}
