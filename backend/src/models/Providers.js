import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    image: {
      url: String,
      public_id: String,
    },
    services: [String],
    location: String,
    availability: String,
    rating: {
      type: Number,
      default: 0
    },
    ratingCount: {
      type: Number,
      default: 0
    }
  }
)

const Providers = mongoose.model("Providers", providerSchema)
export default Providers
