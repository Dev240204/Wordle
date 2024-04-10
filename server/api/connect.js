const mongoose = require('mongoose');
const mongodbURI = process.env.MONGODB_URI_PROD || "mongodb://localhost:27017/wordle";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongodbURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;
