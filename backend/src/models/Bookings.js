import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Providers",
      required: true
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'completed', 'cancelled'],
      default: 'pending',
    },
    scheduledTime: String,
    address: String,
    notes: String
  }
)

const Bookings = mongoose.model("Bookings", bookingSchema)
export default Bookings
