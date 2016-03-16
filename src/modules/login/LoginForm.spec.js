import sut from './LoginForm';

describe('app::login: LoginForm', () => {

    it('should get fields', function() {
        var fields = sut.getFields();

        fields.employeeId.should.equal('');
        fields.password.should.equal('');
    });
});