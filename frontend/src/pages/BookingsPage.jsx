import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import api from "../api/api";
import { checkUser } from "../utils/Auth";
import Overlay from "../components/Overlay";
import toast from "react-hot-toast";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const [book, setBook] = useState(null)
  const [rate, setRate] = useState(0)
  const [loading, setLoading] = useState(true)
  const user = checkUser()
  const [open, setOpen] = useState(false)

  const colors = {
    pending: 'text-gray-500',
    accepted: 'text-blue-400',
    completed: 'text-green-400',
    cancelled: 'text-red-400'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`booking/user/${user.id}`)
        setBookings(res.data)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  async function rateProvider() {
    try {
      const res = await api.put(`/provider/rate`, {
        id: book.providerId,
        rate: rate
      })
      toast.success(res.data.message)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      console.log(message)
    } finally {
      setOpen(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center text-xl items-center h-screen">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="mx-2">
      <NavBar />
      <Overlay isOpen={open} onClose={() => {
        setOpen(false)
        rateProvider()
      }}>
        <div>
          <div className="flex justify-center">
            <h1>Rate Provider</h1>
          </div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => setRate(star)} className={` ${star <= rate ? 'fill-gray-400' : 'fill-gray-600'}`} >
                <svg className="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" /></svg>
              </span>
            ))}
          </div>
        </div>
      </Overlay>
      <div className="flex justify-center">
        <h1 className="text-xl font-bold">Your Bookings</h1>
      </div>
      {bookings.length > 0 ? (
        <div className="flex flex-col gap-2">
          {bookings.map((booking) => (
            <div className="bg-gray-800 text-white p-2" key={booking._id}>
              <div className="flex gap-1">
                <h1>Address: </h1>
                <p>{booking.address}</p>
              </div>
              <div className="flex gap-1">
                <h1>Scheduled Time: </h1>
                <p>{booking.scheduledTime}</p>
              </div>
              <div className="flex gap-1">
                <h1> Notes: </h1>
                <p>{booking.notes}</p>
              </div>
              <div className="flex gap-1">
                <h1> Status: </h1>
                <p className={`${colors[booking.status]}`}>{booking.status}</p>
              </div>
              {booking.status !== "pending" && booking.status !== "accepted" && !rate && (
                <div className="flex">
                  <button className="w-full border py-1" onClick={() => {
                    setOpen(true)
                    setBook(booking)
                  }
                  }>Rate Provider</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="h-99 flex justify-center items-center">
          <p>You have no bookings now</p>
        </div >
      )
      }
    </div >
  )
}
