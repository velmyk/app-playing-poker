export default class LoginService {
    constructor($http,
                $state) {
        'ngInject';

        this.$http = $http;
        this.$state = $state;
    }

    signIn(credentials) {

        return this.$http.post('http://localhost:9000/api/auth/local', credentials);
    }

    signOut() {
        return this.$state.go('login');
    }
}