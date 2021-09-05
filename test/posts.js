import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../src/app.js';
import Post from '../src/models/Post.js';
import User from '../src/models/User.js';

const should = chai.should();

chai.use(chaiHttp);

let token;

// mock posts.
const user = {
    name: 'admin',
    email: 'admin@test.com',
    password: "fuerza"
}

// mock posts.
const posts = [
    {
        title: "I am a post",
        body: "yeah, this is a post",
        tags: ["a"],
        id: "3be05d1c-c8df-4781-a2ca-8de5c967191c"
    },
    {
        title: "I am the second post",
        body: "this is getting awkward",
        tags: ["a","b"]
    },
    {
        title: "I am the third",
        body: "hello!",
        tags: ["a","b","c"]
    },
]


describe('Post CRUD authorized', () => {
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
    
    // Logins with mock user on the aplication before each test instance.
    beforeEach((done) => {
        chai.request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                token = res.body.token;
                done();
            })
    });

    // Creates mock posts on the database before each test instance.
    beforeEach((done) => {
        Post.create(posts);
        done();
    })

    // Delete mock posts of the database after each test instance.
    afterEach((done) => {
        Post.deleteMany({posts}, err => {
            done();
        });
    })

    // Delete mock user of the database after each test instance.
    afterEach(done => {
        User.findOneAndDelete({user}, err => {
            done();
        });
    });

    it("It should GET all the posts", (done) => {
        chai.request(app)
            .get('/api/posts')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("posts");
                res.body.posts.length.should.equal(3);
                done();
            });
    });

    it("It should GET only one post", (done) => {
        chai.request(app)
            .get('/api/posts/3be05d1c-c8df-4781-a2ca-8de5c967191c')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("post");
                res.body.post.should.have.property("title");
                res.body.post.should.have.property("body");
                res.body.post.tags.length.should.equal(1);
                done();
            });
    });

    it("It should POST a new post", (done) => {
        chai.request(app)
            .post('/api/posts')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                title: "Foo",
                body: "bar",
                tags: ["Tic","Tac","Toe"]
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.post.title.should.equal("Foo");
                res.body.post.body.should.equal("bar");
                res.body.post.tags.length.should.equal(3);
                done();
            });
    });

    it("It should not POST a new post if title or body is empty", (done) => {
        chai.request(app)
            .post('/api/posts')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                title: "",
                body: "",
                tags: ["Tic","Tac","Toe"]
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                res.body.error.should.equal(" Title and body cannot be empty ");
                done();
            });
    });

    it("It should UPDATE an existing post", (done) => {
        chai.request(app)
            .put('/api/posts/3be05d1c-c8df-4781-a2ca-8de5c967191c')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                title: "Foo",
                body: "bar",
                tags: ["Tic","Tac","Toe"]
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.post.title.should.equal("Foo");
                res.body.post.body.should.equal("bar");
                res.body.post.tags.length.should.equal(3);
                done();
            });
    });

    it("It should not UPDATE an existing post if title or body is empty", (done) => {
        chai.request(app)
            .put('/api/posts/3be05d1c-c8df-4781-a2ca-8de5c967191c')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                title: "",
                body: "",
                tags: ["Tic","Tac","Toe"]
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("object");
                res.body.error.should.equal(" Title and body cannot be empty ");
                done();
            });
    });

    it("It should warn about non existing post when UPDATE is called", (done) => {
        chai.request(app)
            .put('/api/posts/b51fce04-c3f0-484c-b330-c93b275074be')
            .set({ Authorization: `Bearer ${token}` })
            .send({
                title: "Foo",
                body: "bar",
                tags: ["Tic","Tac","Toe"]
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.message.should.equal(" No post found that matches the given id ");
                done();
            });
    });

    it("It should DELETE an existing post", (done) => {
        chai.request(app)
            .delete('/api/posts/3be05d1c-c8df-4781-a2ca-8de5c967191c')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.equal(" Post deleted successfully ");
                done();
            });
    });

    it("It should warn about non existing post when DELETE is called", (done) => {
        chai.request(app)
            .delete('/api/posts/b51fce04-c3f0-484c-b330-c93b275074be')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.message.should.equal(" No post found that matches the given id ");
                done();
            });
    });

});

describe('Post unauthorized', () => {
    it("It should not GET posts", (done) => {
        chai.request(app)
            .get('/api/posts')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.error.should.equal(" Token not provided ");
                done();
            });
    });

    it("It should not CREATE a post", (done) => {
        chai.request(app)
            .post('/api/posts')
            .send({
                title: "Foo",
                body: "bar",
                tags: ["Tic","Tac","Toe"]
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.error.should.equal(" Token not provided ");
                done();
            });
    });

    it("It should not UPDATE a post", (done) => {
        chai.request(app)
            .put('/api/posts/3be05d1c-c8df-4781-a2ca-8de5c967191c')
            .send({
                title: "Foo",
                body: "bar",
                tags: ["Tic","Tac","Toe"]
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.error.should.equal(" Token not provided ");
                done();
            });
    });

    it("It should not DELETE a post", (done) => {
        chai.request(app)
            .delete('/api/posts/3be05d1c-c8df-4781-a2ca-8de5c967191c')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.error.should.equal(" Token not provided ");
                done();
            });
    });
})
