import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file


const MONGODB_URI = process.env.MONGODB_URI;

async function testMongooseConnection() {

  try {
    console.log(MONGODB_URI)
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is not provided.');
    }

    await mongoose.connect(MONGODB_URI, {
     
      // Other options if needed
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    mongoose.disconnect(); // Close the connection after testing
  }
}

testMongooseConnection();
