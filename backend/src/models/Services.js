import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    basePrice: Number,
    image: String,
  }
)

const Services = mongoose.model("Services", serviceSchema)
export default Services
