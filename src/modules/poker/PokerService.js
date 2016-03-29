export default class PokerService {
    constructor($http,
                $state) {
        'ngInject';

        this.$http = $http;
        this.$state = $state;
    }

    createRoom() {
        this.$http.get('/api/room/create').then(response => {
            this.$state.go('main.poker.room', { id: response.data.id });
        })
    }

    saveRoom(roomInfo) {
        // console.log(roomInfo);
        this.$http.post('/api/room', roomInfo)
            .then(() => {
                console.log('Room saved');
            });
    }
}