import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connec = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB Database ${connec.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDb ${error}`);
  }
};

export default connectDB;
