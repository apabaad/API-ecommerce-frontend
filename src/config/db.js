import mongoose from 'mongoose';

const MongoClient = async () => {
  try {
    const mongoURL = process.env.MONGO_CLIENT;
    if (!mongoURL) {
      return console.log('MongoDB connection in env variable not added.');
    }
    const conn = await mongoose.connect(mongoURL);
    if (conn) {
      console.log('mongoDB connected');
    }
  } catch (error) {
    console.log(error);
  }
};

export default MongoClient;
