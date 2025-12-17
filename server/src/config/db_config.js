import mongoose from 'mongoose';
import { ENV } from '../lib/env.js';
import logger from '../utils/logger.js';

const MONGO_URL = ENV.MONGO_URL;

if(!MONGO_URL) {
   logger.error("MongoDB connection string is not defined in environment variables.");
   process.exit(1);
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URL);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        process.exit(1); // 0 means success, 1 means failure
    }
}

export default connectDB;