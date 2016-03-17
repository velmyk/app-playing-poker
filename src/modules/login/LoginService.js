export default class LoginService {
    constructor($http,
                $state,
                IdentityStore) {
        'ngInject';

        this.$http = $http;
        this.$state = $state;
        this.IdentityStore = IdentityStore;
    }

    signIn(credentials) {

        return this.$http.post('http://localhost:9000/api/auth/local', credentials)
            .then(response => {
                this.IdentityStore.update(response.data);
                console.log(this.IdentityStore.get());
            });
    }

    signOut() {
        return this.$state.go('login');
    }
}