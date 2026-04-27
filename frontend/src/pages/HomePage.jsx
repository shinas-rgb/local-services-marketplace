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

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/service/all')
        setServices(res.data)
        console.log(res.data)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="flex justify-center text-xl items-center h-screen">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="p-2">
      <NavBar />
      <SearchBar />
      <div className="px-2">
        <div className="my-4 flex flex-col gap-2">
          <div className="w-full flex justify-center">
            <h1 className="title-gradient text-2xl w-3/4 text-center  text-white rounded-2xl p-2 font-bold">Find Trusted Services Near You</h1>
          </div>
        </div>
        <div className="my-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="font-bold">Categories</h1>
            <button>
              <h1 className="text-gray-500 hover:text-gray-700">View all</h1>
            </button>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-100 text-center border-2 py-1 px-4 hover:cursor-pointer hover:bg-blue-200">
                <img className="object-cover h-15"
                  src={clamp} alt="" />
                <p className="font-bold text-gray-700">Electric</p>
              </div>
              <div className="bg-blue-100  text-center border-2 py-1 px-4 hover:cursor-pointer hover:bg-blue-200">
                <img className="object-cover h-15"
                  src={brush} alt="" />
                <p className="font-bold text-gray-700">Painting</p>
              </div>
              <div className="bg-blue-100 text-center border-2 py-1 px-4 hover:cursor-pointer hover:bg-blue-200">
                <img className="object-cover h-15"
                  src={wrench} alt="" />
                <p className="font-bold text-gray-700">Repair</p>
              </div>
              <div className="bg-blue-100 text-center border-2 py-1 px-4 hover:cursor-pointer hover:bg-blue-200">
                <img className="object-cover h-15"
                  src={cleaning} alt="" />
                <p className="font-bold text-gray-700">Cleaning</p>
              </div>
              <div className="bg-blue-100 text-center border-2 py-1 px-4 hover:cursor-pointer hover:bg-blue-200">
                <img className="object-cover h-15"
                  src={tap} alt="" />
                <p className="font-bold text-gray-700">Plumbing</p>
              </div>
              <div className="bg-blue-100 text-center border-2 py-1 px-4 hover:cursor-pointer hover:bg-blue-200">
                <img className="object-cover h-15"
                  src={taxi} alt="" />
                <p className="font-bold text-gray-700">Taxi</p>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}
