import { useEffect, useState } from "react"
import api from "../../api/api"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import arrow from "../../assets/images/left-arrow.png"
import pen from "../../assets/images/pen-svgrepo-com.svg"
import bin from "../../assets/images/bin-svgrepo-com.svg"
import { useForm } from "react-hook-form"

export default function Services() {
  const { register, handleSubmit } = useForm()
  const [services, setServices] = useState(null)
  const [edit, setEdit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState(null)
  const [price, setPrice] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/service/all')
        setServices(res.data)
        setName(res.data.name)
        setPrice(res.data.basePrice)
      } catch (error) {
        const message = error.response?.data?.message
        toast.error(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [loading])

  async function onSubmit(data) {
    setLoading(true)
    try {
      const res = await api.post('/service', {
        name: data.name,
        basePrice: Number(data.price)
      })
      toast.success(res.data.message)
      setIsOpen(false)
    } catch (error) {
      const message = error.response?.data?.message
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  async function updateService() {
    try {
      setLoading(true)
      const res = await api.put('/service', {
        name: name,
        basePrice: price,
      })
      toast.success(res.data.message)
    } catch (error) {
      const message = error.response?.data?.message
      toast.error(message)
    } finally {
      setEdit(false)
      setLoading(false)
    }
  }

  async function deleteService(id) {
    try {
      setLoading(true)
      const res = await api.delete('/service', {
        data: { id }
      })
      toast.success(res.data.message)
    } catch (error) {
      const message = error.response?.data?.message
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center text-center">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="mx-2 flex flex-col gap-4">
      <div>
        <Link to="/admin" className="flex gap-1">
          <img className="h-6" src={arrow} alt="" />
          <h1>Back</h1>
        </Link>
      </div>
      <div className="flex justify-center">
        <h1 className="text-2xl">Services</h1>
      </div>
      <div className="py-2 px-3 border rounded text-center">
        <button onClick={() => setIsOpen(true)} className="hover:text-gray-700 ">
          Create New Service
        </button>
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col text-start">
                <label>Name</label>
                <input className="ml-2 border px-3 py-1"
                  {...register("name")}
                  type="text" placeholder="service name" />
              </div>
              <div className="flex flex-col text-start">
                <label>Base price</label>
                <input className="ml-2 border px-3 py-1"
                  {...register("price")}
                  type="number" placeholder="price" />
              </div>
              <button className="bg-gray-300 py-1 rounded hover:bg-gray-400" type="submit">Submit</button>
            </div>
          </form>
        )}
      </div>
      {edit && (
        <div>
          <h1>Edit palce</h1>
          <form onSubmit={updateService}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col text-start">
                <label>Name</label>
                <input className="ml-2 border px-3 py-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text" placeholder="service name" />
              </div>
              <div className="flex flex-col text-start">
                <label>Base price</label>
                <input className="ml-2 border px-3 py-1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number" placeholder="price" />
              </div>
              <button className="bg-gray-300 py-1 rounded hover:bg-gray-400" type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
      <div>
        <table className="table-auto text-left border">
          <thead>
            <tr className="border bg-custom-purple">
              <th className="px-3 py-4 border">Name</th>
              <th className="px-3 py-4 border">Base Pay</th>
              <th className="px-3 py-4 border">Edit</th>
              <th className="px-3 py-4 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr className="border">
                <td className="py-3 px-4 border">{service.name}</td>
                <td className="py-3 px-4 border">{service.basePrice}</td>
                <td className="py-3 px-4 border">
                  <button onClick={() => {
                    setName(service.name)
                    setPrice(service.basePrice || 0)
                    setEdit(true)
                  }}>
                    <img className="h-4" src={pen} alt="" />
                  </button>
                </td>
                <td className="flex justify-center mt-2">
                  <button onClick={() => {
                    deleteService(service._id)
                  }}>
                    <img className="h-6" src={bin} alt="" />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}
