import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    recentMessage: {
        content: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
}, {
    timestamps: true
});

const Chats = mongoose.model('Chats', chatSchema);

export default Chats;
