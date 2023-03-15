const expect = require("chai").expect;
const mongoose = require('mongoose');

const User = require('../models/user');
const FeedController = require('../controllers/feed');

describe('Feed Controller', function () {
    before(function (done) {
        mongoose.connect('mongodb+srv://node-social-app:SidB2023@nodesocial.4wrvdbu.mongodb.net/test-messages?retryWrites=true&w=majority').then((result) => {
            const user = new User({
                email: 'test@test.com',
                password: 'tester',
                name: 'Test',
                posts: [],
                _id: '63fdff5d2a474dfbfd1ec5e1'
            });
            return user.save();
        }).then(() => {
            done();
        });
    });

    beforeEach(function () { });

    afterEach(function () { });

    it('should add a created post to the posts of the creator', function (done) {

        const req = {
            body: {
                title: 'Test Post',
                content: 'A Test Post'
            },
            file: {
                path: 'abc'
            },
            userId: '63fdff5d2a474dfbfd1ec5e1'
        };

        const res = {
            status: function () {
                return this;
            }, json: function () { }
        };

        FeedController.createPost(req, res, () => { }).then((savedUser) => {
            expect(savedUser).to.have.property('posts');
            expect(savedUser.posts).to.have.length(1);
            done();
        });
    });

    after(function (done) {
        User.deleteMany({}).then(() => {
            return mongoose.disconnect();
        }).then(() => {
            done();
        });
    });
});