import express from 'express';
import authenticate from '../middleware/protectRoute.js';
import { 
    addPost, 
    removePost, 
    fetchPost, 
    toggleLike, 
    respondToPost, 
    fetchFeedPosts, 
    fetchUserPosts 
} from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/feed', authenticate, fetchFeedPosts);
postRouter.get('/:postId', authenticate, fetchPost);
postRouter.get('/user/:userHandle', authenticate, fetchUserPosts);
postRouter.post('/create', authenticate, addPost);
postRouter.delete('/:postId', authenticate, removePost);
postRouter.put('/like/:postId', authenticate, toggleLike);
postRouter.put('/reply/:postId', authenticate, respondToPost);

export default postRouter;
