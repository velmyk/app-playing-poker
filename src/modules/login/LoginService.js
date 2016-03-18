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

    signUp(credentials) {

        return this.$http.post('http://localhost:9000/api/user', credentials)
            .then(response => {
                console.log('Signed up succesfuly');
            });
    }

    signOut() {
        return this.$state.go('login');
    }
}