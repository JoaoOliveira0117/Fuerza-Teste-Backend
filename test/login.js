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


describe("User login", () => {
    // Register mock user on the application for further use before each test instance.
    beforeEach((done) => {
        chai.request(app)
            .post('/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    // Deletes mock user from database after each test instance.
    afterEach(done => {
        User.findOneAndDelete({user}, err => {
            done();
        });
    });

    it("It should login to the app and return the User and Token", (done) => {
        chai.request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.user.email.should.equal(user.email);
                done();
            })
    })

    it("It should not login to the app if password is not provided", (done) =>{
        chai.request(app)
            .post('/login')
            .send({ email: user.email, password: ""})
            .end((err, res) => {
                res.body.should.have.property("error");
                res.body.error.should.equal(' Email and password must not be empty ');
                done();
            })
    })

    it("It should not login to the app if email is not provided", (done) =>{
        chai.request(app)
            .post('/login')
            .send({ email: "", password: user.password})
            .end((err, res) => {
                res.body.should.have.property("error");
                res.body.error.should.equal(' Email and password must not be empty ');
                done();
            })
    })

    it("It should not login to the app if no user credentials are provided", (done) =>{
        chai.request(app)
            .post('/login')
            .send({})
            .end((err, res) => {
                res.body.should.have.property("error");
                res.body.error.should.equal(' Email and password must not be empty ');
                done();
            })
    })

    it("It should not login to the app if no user is found", (done) =>{
        chai.request(app)
            .post('/login')
            .send({ email: "foo@bar.com", password: "abc123" })
            .end((err, res) => {
                res.body.should.have.property("error");
                res.body.error.should.equal('User not found');
                done();
            })
    })

    it("It should not login to the app if password is incorrect", (done) =>{
        chai.request(app)
            .post('/login')
            .send({ email: user.email, password: "abc123" })
            .end((err, res) => {
                res.body.should.have.property("error");
                res.body.error.should.equal('Invalid password');
                done();
            })
    })
})