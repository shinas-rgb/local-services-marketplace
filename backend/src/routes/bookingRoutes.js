import express from "express";
import { CreateBooking, getAllBookings, getBookingByUserId, getBookingsByProviderId, updateStatus } from "../controllers/bookingController.js";
import { adminOnly } from "../middleware/adminMiddleware.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/', protect, CreateBooking)
router.get('/user/:id', protect, getBookingByUserId)
router.get('/all', protect, adminOnly, getAllBookings)
router.get('/provider/:id', protect, getBookingsByProviderId)
router.put('/status', protect, updateStatus)

export default router
