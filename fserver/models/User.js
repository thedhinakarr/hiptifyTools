import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 40
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 70,
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);

export default User;
