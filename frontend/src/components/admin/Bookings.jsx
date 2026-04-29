import { useEffect, useState } from "react"
import api from "../../api/api"
import arrow from "../../assets/images/left-arrow.png"
import { Link } from "react-router-dom"

export default function Bookings() {
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("")
  const [bookings, setBookings] = useState([])

  const colors = {
    pending: 'text-gray-500',
    accepted: 'text-blue-400',
    completed: 'text-green-400',
    cancelled: 'text-red-400'
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await api.get('/booking/all', {
          params: status ? { status } : {}
        })
        setBookings(res.data)
      } catch (error) {
        const message = error.response?.data?.message
        console.error(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [status])

  if (loading) {
    return <div className="flex justify-center items-center text-center">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="mx-2">
      <div>
        <Link to="/admin" className="flex gap-1">
          <img className="h-6" src={arrow} alt="" />
          <h1>Back</h1>
        </Link>
      </div>
      <div className="flex justify-center">
        <h1 className="font-bold text-xl">All Bookings</h1>
      </div>
      <div className="bg-gray-600 w-fit py-1 px-2 my-2 text-white">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
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
              </div>
            ))}
          </div>
        ) : (
          <p>NO bookings</p>
        )}
      </div >
    </div>
  )
}
