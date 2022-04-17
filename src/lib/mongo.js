import mongoose from "mongoose";

const dbUri = "mongodb://localhost:27017/home_extras"; //process.env.MONGODB_URI ;

export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(dbUri);
    console.log(`Db connected to ${connection.host}`);
  } catch (ex) {
    console.error(ex.message);
    // process.exit(1);
  }
};
