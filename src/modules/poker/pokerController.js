import SCORES from './SCORES';

export default class PokerController {
    constructor(SocketService,
                IdentityStore) {
        'ngInject';
        this.currentUser = IdentityStore.get();
        this.SCORES = SCORES;
        this.socket = SocketService;
        this.activeUsers = [];
        this.socket.on('newUser', this.newUser.bind(this));
        this.socket.on('onMarkSelect', this.onMyMarkSelect.bind(this));
        this.socket.emit('joinPoker', { userId: this.currentUser._id });
    }


    newUser(data) {
        console.log('newUser');
        this.activeUsers.push(data);
    }

    onMyMarkSelect(mark) {
        console.log('onMarkSelect');
        this.socket.emit('selectMark', {
            userId: this.currentUser._id,
            mark: mark
        });
    }

    onSomeoneMarkSelect(data) {
        console.log('onSomeoneMarkSelect');
        this.users[data.userId][mark] = data.mark;
    }

}
