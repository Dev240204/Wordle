// if (process.env.NODE_ENV !== 'production') {
//   require("dotenv").config();
// }
const mongoose = require('mongoose');
const mongodbURI = "mongodb+srv://vercel-admin-user:h6cau0IRHv8qsbG4@cluster0.qrzymtg.mongodb.net/wordle?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongodbURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;
