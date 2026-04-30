import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import api from "../api/api";
import { Link } from "react-router-dom";

import wrench from "../assets/images/wrench-23-svgrepo-com.svg"
import clamp from "../assets/images/clamp-svgrepo-com.svg"
import brush from "../assets/images/brush-svgrepo-com.svg"
import cleaning from "../assets/images/cleaning.svg"
import tap from "../assets/images/tap-faucet-svgrepo-com.svg"
import taxi from "../assets/images/taxi-svgrepo-com.svg"

export default function AllServicesPage() {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const images = { Plumbing: tap, Painting: brush, Repair: clamp, Electrical: wrench, Cleaning: cleaning, Taxi: taxi }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/service/all`)
        setServices(res.data)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [loading])

  if (loading) {
    return <div className="flex justify-center text-xl items-center h-screen">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="mx-2">
      <NavBar />
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold">All Services</h1>
      </div>
      {services.length > 0 && (
        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:mt-8">
          {services.map((service) => (
            <Link key={service._id} to={`/service/${service.name}`}>
              <div className="bg-blue-100 flex border-2 py-4 px-4 items-center justify-around hover:cursor-pointer hover:bg-blue-200">
                <p className="font-bold text-gray-700">{service.name}</p>
                <img className="object-cover h-15"
                  src={images[service.name]} alt="" />
                <p>Base Price: {service.basePrice}</p>
              </div>
            </Link>
          ))}
        </div>
      )
      }
    </div >
  )
}
