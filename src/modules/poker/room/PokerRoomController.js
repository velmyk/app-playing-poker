import SCORES from './SCORES';

export default class PokerRoomController {
    constructor(SocketService,
                IdentityStore,
                $stateParams,
                PokerService) {
        'ngInject';

        this.$stateParams = $stateParams;
        this.currentUser = IdentityStore.get();
        this.PokerService = PokerService;
        this.SCORES = SCORES;
        this.socket = SocketService;
        this.activeUsers = {};
        this.storyDescription = '';
        this.allVoutes = false;
        this.socket.on('newUser', this.newUser.bind(this));
        this.socket.on('onMarkSelect', this.onSomeoneMarkSelect.bind(this));
        this.socket.on('storyDescriptionChanged', this.onStoryDescriptionChanged.bind(this));
        this.socket.on('connect', this.onConnect.bind(this));
    }

    onConnect() {
        this.socket.emit('joinPoker', {
            userId: this.currentUser._id,
            room: this.$stateParams.id
        });
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
        this.allVoutes = this.everyBodyVoted();
    }

    shareStoryDescription() {
        this.socket.emit('newStoryDescription', {
            storyDescription: this.storyDescription
        });
    }

    onStoryDescriptionChanged(data) {
        this.storyDescription = data.storyDescription;
    }

    everyBodyVoted() {
        console.log('calc');
        console.log(Object.keys(this.activeUsers));
        console.log(Object.keys(this.activeUsers).every(item => !!this.activeUsers[item].mark));
        return Object.keys(this.activeUsers).every(item => !!this.activeUsers[item].mark);
    }

    saveRoom() {
        let marks = Object.keys(this.activeUsers).map(userId => {
            let user = this.activeUsers[userId];
            return {
                name: user.name,
                mark: user.mark
            };
        });
        this.PokerService.saveRoom({
            marks: marks,
            storyDescription: this.storyDescription,
            storyEstimation: this.storyEstimation
        });
    }

}
