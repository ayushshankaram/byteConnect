import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        minLength: 6,
        required: true
    },
    avatar: {
        type: String,
        default: "",
    },
    followers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    biography: {
        type: String,
        default: "",
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;
