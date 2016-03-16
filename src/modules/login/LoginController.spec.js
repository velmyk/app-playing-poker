import LoginController from './LoginController';
import {LOGIN_EXCEPTIONS} from './LOGIN_EXCEPTIONS';

describe('app::login: LoginController', () => {
    let sut;
    let $q;
    let state;
    let deffered;
    let $timeout;
    let LoginService;
    let response;

    beforeEach(() => {
        state = {
            go: env.stub(),
            includes: env.stub()
        };

        angular.mock.inject((_$q_, _$timeout_) => {
            $timeout = _$timeout_;
            $q = _$q_;
        });

        deffered = $q.defer();

        LoginService = {signOn: env.stub().returns(deffered.promise)};
        sut = new LoginController(state, LoginService);
    });

    describe('login', () => {
        context('when form is invalid', () => {
            beforeEach(() => {
                sut.form = {
                    $invalid: true
                };
                sut.login();
            });

            it('should not login', () => {
                LoginService.signOn.should.not.called;
            });
        });
    });

    describe('success', () => {
        it('should go to landing page if user not expired', () => {
            sut.login();

            response = {
                credentialsExpired: false
            };

            deffered.resolve(response);
            $timeout.flush();

            state.go.should.have.been.calledWith('backoffice.landing');
        });

        it('should show error message when user was expired', () => {
            sut.login();

            response = {
                credentialsExpired: true,
                username: '00000'
            };

            deffered.resolve(response);
            $timeout.flush();

            sut.errorText.should.equal('Operator id ' + response.username + ' password expired.')
        });
    });

    describe('on login fail', () => {
        let reason;
        let errorMessage;

        beforeEach(() => {
            sut.login();
            reason = {data: {type: LOGIN_EXCEPTIONS.USER_NOT_FOUND, message: 'Login is invalid'}};
        });

        context('user not exist', () => {
            it('should show error message', () => {
                deffered.reject(reason);
                $timeout.flush();

                sut.errorText.should.equal(reason.data.message);
            });
        });

        context('password not correct', () => {
            it('should show error message', () => {
                reason.data.type = LOGIN_EXCEPTIONS.USER_BAD_CREDENTIALS;

                deffered.reject(reason);
                $timeout.flush();

                sut.errorText.should.equal(reason.data.message);
            });
        });

        context('user is deactivated', () => {
            it('should show error message', () => {
                reason.data.type = LOGIN_EXCEPTIONS.USER_DISABLED;

                deffered.reject(reason);
                $timeout.flush();

                sut.errorText.should.equal(reason.data.message);
            });
        });

        context('user is locked', () => {
            it('should show error message', () => {
                reason.data.type = LOGIN_EXCEPTIONS.USER_LOCKED;
                errorMessage = 'The user is locked. Please contact the administrator';

                deffered.reject(reason);
                $timeout.flush();

                sut.errorText.should.equal(errorMessage);
            });
        });

        context('user has no permission to access', () => {
            it('should show error message', () => {
                reason.data.type = LOGIN_EXCEPTIONS.USER_ACCESS_DENIED;
                errorMessage = 'exceptions.accessDenied';

                deffered.reject(reason);
                $timeout.flush();

                sut.errorText.should.equal(errorMessage);
            });
        });
    });

    describe('login logo', () => {
        let currentState = 'login.fr';

        it('should check that locale is french', () => {
            state.includes.withArgs(currentState).returns(true);
            sut.isFrenchLocale().should.be.true;
        });

        it('should check that locale is not french', () => {
            state.includes.withArgs(currentState).returns(false);
            sut.isFrenchLocale().should.be.false;
        });
    });
});
