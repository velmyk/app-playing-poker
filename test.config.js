import 'core-js/es5';
import 'angular';
import 'angular-mocks/angular-mocks';
import chai from 'chai';

chai.should();

loadSpecs();

function loadSpecs() {
    var contextBO = require.context('./src', true, /\.spec\.js$/);
    contextBO.keys().forEach(contextBO);

    var contextEJ = require.context('./electronic-journal', true, /\.spec\.js$/);
    contextEJ.keys().forEach(contextEJ);
}

beforeEach(function () {
    window.env = sinon.sandbox.create();
});

afterEach(function () {
    window.env.restore();
});

/*
* Region: Polyfills
*/

if (!Array.prototype.find) {
    Array.prototype.find = function(check) {
        var findFn = check;

        if (typeof findFn !== 'function') {
            findFn = function(item) {
                return item === check;
            };
        }

        return this.filter(findFn)[0];
    };
}

/*
* Region: Helper methods
*/

window.RandomString = RandomString;

function RandomString() {
    return '' + Math.random();
}