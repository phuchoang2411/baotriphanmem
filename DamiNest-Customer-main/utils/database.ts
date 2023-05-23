import mongoose from 'mongoose';
import config from '../config';
import { Error } from 'mongoose';

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL!, {});
    console.log('Mongoose is connected');
  } catch (error) {
    console.error('Mongoose is encountered an error', error);
  }
};

export { connectDatabase };
