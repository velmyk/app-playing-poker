export default class LoginService {
    constructor($http,
                $state,
                IdentityStore,
                $window) {
        'ngInject';

        this.$http = $http;
        this.$state = $state;
        this.IdentityStore = IdentityStore;
        this.$window = $window;
    }

    signIn(credentials) {

        return this.$http.post('/api/auth/local', credentials)
            .then(response => {
                this.IdentityStore.update(response.data);
            });
    }

    signUp(credentials) {

        return this.$http.post('/api/user', credentials)
            .then(response => {
                this.IdentityStore.update(response.data.response);
            });
    }

    signInWithGitHub() {
        this.$window.location.href = '/api/auth/github/auth';
    }

    getMe() {
        return this.$http.get('/api/user/me');
    }

    signOut() {
        return this.$state.go('login');
    }
}