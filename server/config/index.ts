import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const options: ConnectOptions = {};

const connectDB = async () => {
  let DB_URL;
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") DB_URL = process.env.DB_URL;
  else DB_URL = process.env.DB_URL_DEV;

  mongoose.connect(DB_URL, options, (err) => {
    if (err) throw err;
    console.log("MongoDB Connected...");
  });
};

export default connectDB;
