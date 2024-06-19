import Conversations from '../models/chatModel.js';
import Message from '../models/messagingModel.js';

async function sendMessage(req, res) {
    try {
        const { recipientId, message } = req.body;
        const senderId = req.user._id;

        let conversation = await Conversations.findOne({
            participants: { $all: [senderId, recipientId] },
        });

        if (!conversation) {
            conversation = new Conversations({
                participants: [senderId, recipientId],
                lastMessage: {
                    text: message,
                    sender: senderId,
                },
            });
            await conversation.save();
        }

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message,
        });

        await Promise.all([
            newMessage.save(),
            Conversations.updateOne(
                { _id: conversation._id },
                {
                    $set: {
                        lastMessage: {
                            text: message,
                            sender: senderId,
                        },
                    },
                }
            ),
        ]);

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error('Error in sendMessage:', err);
    }
}

async function getMessages(req, res) {
    const { otherUserId } = req.params;
    const userId = req.user._id;

    try {
        const conversation = await Conversations.findOne({
            participants: { $all: [userId, otherUserId] },
        });

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        const messages = await Message.find({
            conversationId: conversation._id,
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error('Error in getMessages:', err);
    }
}

async function getConversations(req, res) {
    const userId = req.user._id;

    try {
        const conversations = await Conversations.find({
            participants: userId,
        }).populate({
            path: 'participants',
            select: 'username profilePic',
        });

        conversations.forEach((conversation) => {
            conversation.participants = conversation.participants.filter(
                (participant) => participant._id.toString() !== userId.toString()
            );
        });

        res.status(200).json(conversations);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error('Error in getConversations:', err);
    }
}

export { sendMessage, getMessages, getConversations };
