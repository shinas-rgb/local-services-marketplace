import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    password: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['user', 'provider', 'admin'],
      default: 'user'
    },
  }
)

const User = mongoose.model("User", userSchema)
export default User
