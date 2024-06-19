import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        maxLength: 500
    },
    image: {
        type: String
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type: String,
                required: true
            },
            userProfilePicture: {
                type: String,
            },
            username: {
                type: String,
            }
        }
    ]
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
