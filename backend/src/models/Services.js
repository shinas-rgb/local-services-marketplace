import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    basePrice: Number,
  }
)

const Services = mongoose.model("Services", serviceSchema)
export default Services
