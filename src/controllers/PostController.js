import Post from "../models/Post.js";

class PostController {

    async get(req,res){
        try{
            const id = req.params.id;
            const post = await Post.findOne({ id });

            if(post === null)
                return res.status(404).send({ message: ' No post found that matches the given id '});

            return res.send({ post });
        } catch (err) {
            return res.status(400).send({ error: ' Could not search for posts ', err});
        }
    }

    async index(req, res) {
        try{
            /* pagination */
            const page = req.query.page;
            const PAGE_SIZE = 5; // data per page
            const skip = ((page || 1) - 1) * PAGE_SIZE; // page number

            const posts = await Post.find({})
                                    .limit(PAGE_SIZE)
                                    .skip(skip);
                                    
            return res.send({ posts });
        } catch (err) {
            return res.status(400).send({ error: ' Could not search for posts ', err});
        }
    }

    async store(req, res) {
        try {
            const post = await Post.create(req.body);

            return res.send({ post });
        } catch(err){
            return res.status(400).send({ error: ' Could not create post ', err});
        }
    }

    async update (req, res) {
        try {
            const id = req.params.id;
            const update = req.body;

            const post = await Post.findOneAndUpdate({ id }, update , {
                new: true,
            });

            if(post === null)
                return res.status(404).send({ message: ' No post found that matches the given id '});

            return res.send({ post });

        } catch (err) {
            return res.status(400).send({ error: ' Could not edit post ', err });
        }
    }

    async delete (req, res){
        try{
            const id = req.params.id;

            const post = await Post.findOneAndDelete({ id })

            if(post === null)
                return res.status(404).send({ message: ' No post found that matches the given id '});

            return res.send({ message: ' Post deleted successfully ' });
        } catch (err) {
            return res.status(400).send({ error: ' Could not delete post ', err });
        }
    }
}

export default new PostController();