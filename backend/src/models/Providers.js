import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    services: [String],
    location: String,
    availability: String,
    rating: Number
  }
)

const Providers = mongoose.model("Providers", providerSchema)
export default Providers
