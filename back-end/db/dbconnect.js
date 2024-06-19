import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connection successful');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        process.exit(1);
    }
};

export default connectDatabase;
