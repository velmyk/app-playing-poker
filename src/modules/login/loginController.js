import LoginForm from './LoginForm';
import {LOGIN_EXCEPTIONS} from './LOGIN_EXCEPTIONS';

export default class LoginController {
    constructor($state,
                LoginService) {
        'ngInject';

        this.form = {};
        this.$state = $state;
        this.LoginService = LoginService;
        this.input = LoginForm.getFields();
    }

    login() {
        if (this.form.$invalid) {
            return;
        }
        this.LoginService.signIn(this.input);
    }
}
