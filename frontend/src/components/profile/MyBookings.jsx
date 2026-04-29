import { Link } from "react-router-dom";
import arrow from "../../assets/images/left-arrow.png"
import { useEffect, useState } from "react";
import api from "../../api/api";
import { checkUser } from "../../utils/Auth";
import toast from "react-hot-toast";

export default function MyBookings() {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const user = checkUser()

  const colors = {
    pending: 'text-gray-500',
    accepted: 'text-blue-400',
    completed: 'text-green-400',
    cancelled: 'text-red-400'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const providerRes = await api.get(`/provider/${user.id}`)

        const res = await api.get(`/booking/provider/${providerRes.data._id}`)
        setBookings(res.data)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [loading])

  async function updateStatus(e, id) {
    setLoading(true)
    try {
      const res = await api.put('/booking/status', {
        id, status: e.target.value
      })
      toast.success(res.data.message)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      console.log(message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center text-xl items-center h-screen">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="mx-2">
      <div>
        <Link to="/profile" className="flex gap-1">
          <img className="h-6" src={arrow} alt="" />
          <h1>Back</h1>
        </Link>
      </div>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold">Upcoming Services</h1>
      </div>
      <div>
        {bookings.length > 0 ? (
          <div>
            {bookings.map((booking) => (
              <div className="bg-gray-800 text-white p-2">
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
                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <button className="w-full bg-green-400 py-1" value={'accepted'} onClick={(e) => updateStatus(e, booking._id)}>Accept</button>
                    <button className="w-full bg-red-500" value={'cancelled'} onClick={(e) => updateStatus(e, booking._id)}>Decline</button>
                  </div>
                )}
                {booking.status === 'accepted' && (
                  <div className="flex gap-2">
                    <button className="w-full bg-green-400 py-1" value={'completed'} onClick={(e) => updateStatus(e, booking._id)}>Completed</button>
                    <button className="w-full bg-red-500" value={'cancelled'} onClick={(e) => updateStatus(e, booking._id)}>Cancelled</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>NO bookings</p>
        )}
      </div>
    </div>
  )
}
