import SCORES from './SCORES';

export default class PokerRoomController {
    constructor(SocketService,
                IdentityStore) {
        'ngInject';
        this.currentUser = IdentityStore.get();
        this.SCORES = SCORES;
        this.socket = SocketService;
        this.activeUsers = [];
        this.storyDescription = '';
        this.socket.on('newUser', this.newUser.bind(this));
        this.socket.on('onMarkSelect', this.onSomeoneMarkSelect.bind(this));
        this.socket.on('storyDescriptionChanged', this.onStoryDescriptionChanged.bind(this));
        this.socket.emit('joinPoker', { userId: this.currentUser._id });
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

        this.activeUsers.forEach(user => {
            if(user.userId === data.userId) user.mark = data.mark;
        });
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
