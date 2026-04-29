import Bookings from "../models/Bookings.js"

export async function CreateBooking(req, res) {
  try {
    const { userId, providerId, serviceId, status, scheduledTime, address, notes } = req.body
    const newBooking = new Bookings({
      userId, providerId, serviceId, status, scheduledTime, address, notes
    })
    await newBooking.save()
    res.status(201).json({ message: "Service booked", newBooking })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function getBookingByUserId(req, res) {
  try {
    const id = req.params.id
    const bookings = await Bookings.find({ userId: id })
    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function getBookingsByProviderId(req, res) {
  try {
    const id = req.params.id
    const bookings = await Bookings.find({ providerId: id })
    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function updateStatus(req, res) {
  try {
    const { id, status } = req.body
    const updatedBooking = await Bookings.findByIdAndUpdate(id, { status }, { new: true })
    res.status(200).json({ message: "Status updated", updatedBooking })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
