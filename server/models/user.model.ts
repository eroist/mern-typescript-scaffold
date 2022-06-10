import mongoose, { Schema, Model, Document } from "mongoose";
type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
};

type UserInput = {
  name: UserDocument["name"];
  email: UserDocument["email"];
  password: UserDocument["password"];
};

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "users", timestamps: true }
);

const User: Model<UserDocument> = mongoose.model("user", UserSchema);

export { User, UserInput, UserDocument };
