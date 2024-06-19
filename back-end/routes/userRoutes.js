import express from 'express';
import { 
    toggleFollow, 
    fetchUserProfile, 
    authenticateUser, 
    signOutUser, 
    registerUser, 
    modifyUser 
} from '../controllers/userController.js';
import authenticate from '../middleware/protectRoute.js';

const userRouter = express.Router();

userRouter.get('/profile/:identifier', fetchUserProfile);
userRouter.post('/signup', registerUser);
userRouter.post('/login', authenticateUser);
userRouter.post('/logout', signOutUser);
userRouter.post('/follow/:userId', authenticate, toggleFollow);
userRouter.put('/update/:userId', authenticate, modifyUser);

export default userRouter;
