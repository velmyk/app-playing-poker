import login from './login.module';

describe('app::login: loginRoutes', () => {
    let sut,
        i18n,
        $state,
        $q,
        $timeout;

    const STATE_NAMES = [
        'login',
        'login.fr'
    ];

    beforeEach(() => {
        angular.mock.module(login);

        angular.mock.inject((_$state_, _$q_, _$timeout_) => {
            $state = _$state_;
            $q = _$q_;
            $timeout = _$timeout_;
        });

        i18n = {
            set: env.stub()
        };
    });

    it('should register all state names', function() {
        STATE_NAMES.forEach(stateName => {
            $state.get(stateName).should.be.an.object;
        });
    });

    it('should resolve access', () => {
        const accessToLoginPage = {};
        const StateAccessResolver = {
            resolveAccessToAuthorizationPage: env.stub().returns(accessToLoginPage)
        }

        sut = $state.get('login');

        sut.resolve.access(StateAccessResolver).should.equal(accessToLoginPage);
    });

    it('should set french locale on french login state', () => {
        sut = $state.get('login.fr');

        sut.onEnter(i18n);
        i18n.set.should.have.been.calledWith('FR');
    });


});