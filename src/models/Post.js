import mongoose from '../database/index.js';
import { v4 as uuidv4 } from 'uuid';

const PostSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4(),
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
    }]
},
{
    timestamps: true
})

const Post = mongoose.model('Post', PostSchema);

export default Post;