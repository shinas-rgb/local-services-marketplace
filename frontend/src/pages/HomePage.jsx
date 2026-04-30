import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import wrench from "../assets/images/wrench-23-svgrepo-com.svg"
import clamp from "../assets/images/clamp-svgrepo-com.svg"
import brush from "../assets/images/brush-svgrepo-com.svg"
import cleaning from "../assets/images/cleaning.svg"
import tap from "../assets/images/tap-faucet-svgrepo-com.svg"
import taxi from "../assets/images/taxi-svgrepo-com.svg"
import { useEffect, useState } from "react";
import api from "../api/api.js"
import { Link } from "react-router-dom";

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const images = { Plumbing: tap, Painting: brush, Repair: clamp, Electrical: wrench, Cleaning: cleaning, Taxi: taxi }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceRes = await api.get('/service/all')
        setServices(serviceRes.data)

      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  function setImage(name) {
    return images[name]
  }

  if (loading) {
    return <div className="flex justify-center text-xl items-center h-screen">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="mx-2">
      <NavBar />
      <SearchBar />
      <div className="px-2">
        <div className="my-4 flex flex-col gap-2">
          <div className="w-full flex justify-center">
            <h1 className="title-gradient text-2xl w-3/4 sm:w-1/4 sm:py-6 sm:my-2 text-center  text-white rounded-2xl p-2 font-bold">Find Trusted Services Near You</h1>
          </div>
        </div>
        <div className="my-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="font-bold">Categories</h1>
            <button>
              <Link to="/all-services">
                <h1 className="text-gray-500 hover:text-gray-700">View all</h1>
              </Link>
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {services.map((service) => (
              <div key={service._id} className="bg-blue-100 text-center border-2 py-1 px-4 hover:cursor-pointer hover:bg-blue-200">
                <Link to={`/service/${service.name}`}>
                  <img className="object-cover h-15"
                    src={setImage(service.name)} alt="" />
                  <p className="font-bold text-gray-700">{service.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div >
    </div>
  )
}
