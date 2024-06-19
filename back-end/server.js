import express from 'express';
import dotenv from 'dotenv';
import initializeDb from './db/connectDb.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

initializeDb();

const server = express();
const SERVER_PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/messages', messageRouter);

server.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
