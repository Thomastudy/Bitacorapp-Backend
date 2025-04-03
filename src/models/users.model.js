import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  birth: {
    type: Date,
    required: true,
  },
  nacionality: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["master", "admin", "user"],
    default: "user",
  },
  fact: {
    type: String,
    required: false,
    maxlength: 600,
    trim: true,
  },
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
