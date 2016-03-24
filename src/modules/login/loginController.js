import LoginForm from './LoginForm';
import {LOGIN_EXCEPTIONS} from './LOGIN_EXCEPTIONS';

export default class LoginController {
    constructor($state,
                LoginService) {
        'ngInject';

        this.signInForm = {};
        this.signUpForm = {};
        this.$state = $state;
        this.LoginService = LoginService;
        this.input = LoginForm.getFields();
    }

    signIn() {
        this.LoginService.signIn(this.input);
    }

    signUp() {
        this.LoginService.signUp(this.input);
    }

    signInWithGitHub() {
        this.LoginService.signInWithGitHub();
    }

    getMe() {
        this.LoginService.getMe();
    }

    signUpWithGitGub() {

    }

    logOut() {
        
    }
}
