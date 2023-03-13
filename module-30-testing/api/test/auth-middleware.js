const expect = require("chai").expect;
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/is-auth');
const sinon = require('sinon');

describe('Auth middleware', function () {
    it('should throw an error if no authorization header is present', function () {
        const req = {
            get: function (headerName) {
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw('Not authenticated.'); // checking if the test throw identical error
    });

    it('should throw an error if the authorization header is only the string', function () {
        const req = {
            get: function (headerName) {
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw(); // when you are not sure about the error message
    });

    it('should yeild a userId after decoding the token', function () {
        const req = {
            get: function (headerName) {
                return 'Bearer dycsuucucchvjj';
            }
        };
        sinon.stub(jwt, 'verify');
        jwt.verify.returns({ userId: 'abc' });
        authMiddleware(req, {}, () => {});
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId', 'abc');
        expect(jwt.verify.called).to.be.true;
        jwt.verify.restore();
    });

    it('should throw an error if the token cannot be verified', function () {
        const req = {
            get: function (headerName) {
                return 'Bearer xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw(); 
    });
});