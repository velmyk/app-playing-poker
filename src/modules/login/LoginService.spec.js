import LoginService from './LoginService';

describe('LoginService', () => {
    let
        sut,
        $http,
        $state,
        IdentityStore,
        $window,
        $q,
        $timeout;

    let
        deffered,
        credentials;

    beforeEach(() => {

        angular.mock.inject((_$q_,
                             _$timeout_) => {
            $q = _$q_,
            $timeout = _$timeout_;
        });

        deffered = $q.defer();

        $http = {
            post: jasmine.createSpy('post').and.returnValue(deffered.promise),
            get: jasmine.createSpy('get')
        };

        $state = {
            go: jasmine.createSpy('go')
        };

        IdentityStore = {
            update: jasmine.createSpy('update')
        };

        $window = {
            location: {
                href: 'someUrl'
            }
        };

        sut = new LoginService($http,
                              $state,
                              IdentityStore,
                              $window);
    });

    describe('sign in', () => {
        let
            user;

        beforeEach(() => {
            credentials = {};
            sut.signIn(credentials);
        });

        it('should sign in on server', () => {
            expect($http.post).toHaveBeenCalledWith('/api/auth/local', credentials);
        });

        describe('on success log in', () => {
            beforeEach(() => {
                user = {};
                deffered.resolve({
                    data: user
                });
                $timeout.flush();
            });

            it('should store user information', () => {
                expect(IdentityStore.update).toHaveBeenCalledWith(user);
            });
        });
    });

});