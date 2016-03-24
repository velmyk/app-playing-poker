import SCORES from './SCORES';

export default class PokerRoomController {
    constructor(SocketService,
                IdentityStore,
                $stateParams) {
        'ngInject';

        this.$stateParams = $stateParams;
        this.currentUser = IdentityStore.get();
        this.SCORES = SCORES;
        this.socket = SocketService;
        this.activeUsers = {};
        this.storyDescription = '';
        this.socket.on('newUser', this.newUser.bind(this));
        this.socket.on('onMarkSelect', this.onSomeoneMarkSelect.bind(this));
        this.socket.on('storyDescriptionChanged', this.onStoryDescriptionChanged.bind(this));
        this.socket.on('connect', this.onConnect.bind(this));
    }

    onConnect() {
        this.socket.emit('joinPoker',   {
                                            userId: this.currentUser._id,
                                            room: this.$stateParams.id
                                        }
        );
    }

    newUser(data) {
        console.log('newUser', data);
        this.activeUsers = data;
        console.log('all', this.activeUsers);
    }

    onMyMarkSelect(mark) {
        console.log('onMyMarkSelect', mark);
        this.socket.emit('selectMark', {
            userId: this.currentUser._id,
            mark: mark
        });
    }

    onSomeoneMarkSelect(data) {
        console.log('someoneMark', data);
        this.activeUsers[data.userId]['mark'] = data.mark;
    }

    shareStoryDescription() {
        this.socket.emit('newStoryDescription', {
            storyDescription: this.storyDescription
        });
    }

    onStoryDescriptionChanged(data) {
        this.storyDescription = data.storyDescription;
    }

}
