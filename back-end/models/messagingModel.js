import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chats' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
}, {
    timestamps: true
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;
