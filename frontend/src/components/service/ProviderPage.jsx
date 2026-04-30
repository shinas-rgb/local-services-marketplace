import { Link, useParams } from "react-router-dom";
import arrow from "../../assets/images/left-arrow.png"
import { useEffect, useState } from "react";
import api from "../../api/api";
import Overlay from "../Overlay";
import { useForm } from "react-hook-form";
import { checkUser } from "../../utils/Auth";
import toast from "react-hot-toast";
import NavBar from "../NavBar";

export default function ProviderPage() {
  const { name, id } = useParams()
  const [loading, setLoading] = useState(true)
  const [provider, setProvider] = useState(null)
  const [service, setService] = useState(null)
  const [open, setOpen] = useState(false)
  const { register, handleSubmit } = useForm()
  const user = checkUser()

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      try {
        const providerRes = await api.get(`/provider/${id}`)
        setProvider(providerRes.data)

        if (name) {
          const serviceRes = await api.get(`/service/${name}`)
          setService(serviceRes.data)
        }
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  async function bookService(data) {
    try {
      if (!name) {
        const serviceRes = await api.get(`/service/${data.service}`)
        setService(serviceRes.data)
      }
      const res = await api.post('/booking', {
        userId: user.id,
        providerId: provider._id,
        serviceId: service._id,
        status: "pending",
        scheduledTime: data.time,
        address: data.address,
        notes: data.notes
      })
      toast.success(res.data.message)
      setOpen(false)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      console.log(message)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center text-center">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="mx-2">
      {!name && (
        <NavBar />
      )}
      <div>
        <Link to={name ? `/service/${name}` : `/search`} className="flex gap-1">
          <img className="h-6" src={arrow} alt="" />
          <h1>Back</h1>
        </Link>
      </div>
      <Overlay isOpen={open} onClose={() => setOpen(false)}>
        <div>
          <div className="flex justify-center mb-2">
            <h1>Book Service</h1>
          </div>
          <form onSubmit={handleSubmit(bookService)}>
            <div className="flex flex-col gap-2">
              {!name && (
                <div className="flex gap-2">
                  <label>Service:</label>
                  <input type="text" placeholder="service" {...register("service")}
                    className="border pl-2 w-full" />
                </div>
              )}
              <div className="flex gap-2">
                <label>Time:</label>
                <input type="text" placeholder="scheduled time" {...register("time")}
                  className="border pl-2 w-full" />
              </div>
              <div className="flex gap-2">
                <label>Address:</label>
                <input type="text" placeholder="your address" {...register("address")}
                  className="border pl-2 w-full" />
              </div>
              <div className="flex gap-2">
                <label>Notes:</label>
                <input type="text" placeholder="notes to the provider" {...register("notes")}
                  className="border pl-2 w-full" />
              </div>
              <div>
                <button type="submit" className="w-full py-1 bg-blue-400 text-white rounded-xl">Book</button>
              </div>
            </div>
          </form>
        </div>
      </Overlay>
      <div className="bg-violet-500 rounded-xl sm:flex sm:flex-col sm:w-fit sm:gap-4 py-4 my-4 px-4 text-white">
        <div className=" ml-4">
          <h1 className="text-xl font-bold">{provider.name}</h1>
        </div>
        <div className="sm:flex sm:flex-col sm:gap-4">
          <div className="flex justify-center">
            <img src={provider.image.url} alt="" className="h-32" />
          </div>
          <div>
            <h2 className="font-bold">All Services:</h2>
            <ul className="ml-2">
              {provider.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
          <div className="flex">
            <h2 className="font-bold">Location: </h2>
            <p className="ml-2">{provider.location}</p>
          </div>
          <div className="flex">
            <h2 className="font-bold">Availability: </h2>
            <p className="ml-2">{provider.availability}</p>
          </div>
          <div className="flex">
            <h2 className="font-bold">Rating: </h2>
            <p className="ml-2">{provider.rating}</p>
          </div>
        </div>
      </div>
      {user && user.id !== provider.userId && (
        <div>
          <button onClick={() => setOpen(true)}
            className="font-bold hover:cursor-pointer hover:text-gray-700 border py-1 px-2 rounded-xl">
            Book Now
          </button>
        </div>
      )}
    </div>
  )
}
