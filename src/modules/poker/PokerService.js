export default class PokerService {
    constructor($http,
                $state) {
        'ngInject';

        this.$http = $http;
        this.$state = $state;
    }

    createRoom() {
        this.$http.get('/api/poker/room/create').then(response => {
            console.log(response);
            this.$state.go('main.poker.room', { id: response.data.id });
        })
    }
}