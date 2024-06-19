import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const authenticateUser = async (request, response, next) => {
    try {
        const token = request.cookies.jwtToken;

        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.userId).select('-password');

        request.user = user;

        next();
    } catch (error) {
        response.status(500).json({ message: error.message });
        console.log('Error in authenticateUser middleware:', error.message);
    }
};

export default authenticateUser;
