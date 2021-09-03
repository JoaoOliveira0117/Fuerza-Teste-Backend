import Post from "../models/Post.js";

class PostController {

    async index(req, res) {
        try{
            const posts = await Post.findAll();
            return res.send({posts});
        } catch (err) {
            return res.status(400).send({ error: ' Could not search for posts ', err})
        }
    }

    async store(req, res) {
        try {
            const post = await Post.create(req.body);

            return res.send({post});
        } catch(err){
            return res.status(400).send({ error: ' Could not create post ', err})
        }
    }
}

export default new PostController();