import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../src/app.js';
import User from '../src/models/User.js';

const should = chai.should();

chai.use(chaiHttp);

// mock user.
const user = {
    name: 'admin',
    email: 'admin@test.com',
    password: "fuerza"
}

describe('User register', () => {
    // Delestes mock user from the database after each test instance.
    afterEach(done => {
        User.findOneAndDelete({user}, err => {
            done();
        });
    });

    it("It should register the user on the app", (done) => {
        chai.request(app)
            .post('/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("user");
                res.body.user.email.should.equal(user.email);
                done();
            });
    });

    it("It should not register the user if name is not provided", (done) => {
        chai.request(app)
            .post('/register')
            .send({ name: "", email: user.email, password: user.password})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("error");
                res.body.error.should.equal(" Email and password must not be empty ");
                done();
            });
    });

    it("It should not register the user if email is not provided", (done) => {
        chai.request(app)
            .post('/register')
            .send({ name: user.name, email: "", password: user.password})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("error");
                res.body.error.should.equal(" Email and password must not be empty ");
                done();
            });
    });

    it("It should not register the user if password is not provided", (done) => {
        chai.request(app)
            .post('/register')
            .send({ name: user.name, email: user.email, password: ""})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("error");
                res.body.error.should.equal(" Email and password must not be empty ");
                done();
            });
    });
})