import express from 'express';
import authenticate from '../middleware/protectRoute.js';
import { fetchMessages, deliverMessage, fetchConversations } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get('/conversations', authenticate, fetchConversations);
messageRouter.post('/', authenticate, deliverMessage);
messageRouter.get('/:recipientId', authenticate, fetchMessages);

export default messageRouter;
