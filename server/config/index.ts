import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
// user defined
import Config from "./config.json";

dotenv.config();

const options: ConnectOptions = {};

const connectDB = async () => {
  let DB_URL;
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") DB_URL = Config.DB_URL.DEV;
  else DB_URL = Config.DB_URL.PRO;

  mongoose.connect(DB_URL, options, (err) => {
    if (err) throw err;
    console.log("MongoDB Connected...");
  });
};

export default connectDB;
