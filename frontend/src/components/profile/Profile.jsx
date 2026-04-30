import { useEffect, useState } from "react"
import { checkUser } from "../../utils/Auth"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import api from "../../api/api"
import Overlay from "../../components/Overlay.jsx"
import { useForm } from "react-hook-form"

export default function Profile() {
  const [user, setUser] = useState(checkUser())
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [services, setServices] = useState([""])
  const { register, handleSubmit } = useForm()
  const [file, setFile] = useState(null)
  const [edit, setEdit] = useState(false)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState(0)
  const [location, setLocation] = useState("")
  const [available, setAvailable] = useState("")
  const [provider, setProvider] = useState(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get(`/user/${user._id || user.id} `)
        setUser(userRes.data)

        setName(userRes.data.name)
        setPhone(userRes.data.phone)
        if (userRes.data.role === 'provider') {
          const providerRes = await api.get(`/provider/${userRes.data._id}`)
          setProvider(providerRes.data)
          setLocation(providerRes.data.location)
          setAvailable(providerRes.data.availability)
          setServices(providerRes.data.services)
          setImage(providerRes.data.image)
        }
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [loading])

  function logout() {
    localStorage.removeItem("token")
    setUser(null)
    toast.success("Logout successfully")
    navigate('/')
  }

  function handleServiceChange(index, value) {
    const updated = [...services]
    updated[index] = value
    setServices(updated)
  }

  function handleChange(e) {
    const selected = e.target.files[0];

    // basic validation (you should do this)
    if (!selected.type.startsWith("image/")) return;
    if (selected.size > 2 * 1024 * 1024) return;

    setFile(selected);
  }

  async function onSubmit(data) {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("image", file)

      const imageRes = await api.post('/image/upload', formData)

      const res = await api.post('/provider', {
        id: user._id,
        name: user.name,
        image: imageRes.data,
        services: services,
        location: data.location,
        availability: data.availability,
        rating: 0

      })

      const userRes = await api.put('/user/role', {
        id: user._id,
        role: 'provider'
      })
      toast.success(userRes.data.message)

      setOpen(false)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      console.log(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }


  async function editSubmit() {
    setLoading(true)
    try {
      if (user.role === 'provider') {
        const formData = new FormData()
        if (!image) {
          formData.append("image", file)
          const imageRes = await api.post('/image/upload', formData)
          setImage(imageRes)
        }

        const res = await api.put('/provider', {
          id: provider._id,
          name: name,
          image: image || provider.image,
          services: services,
          location: location,
          availability: available,
        })
      }

      const userRes = await api.put('/user', {
        id: user._id,
        name: name,
        phone: phone
      })
      toast.success(userRes.data.message)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      console.log(message)
    } finally {
      setLoading(false)
      setEdit(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center text-xl items-center h-screen">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="mx-2">
      <Overlay isOpen={open} onClose={() => setOpen(false)}>
        <div>
          <div className="flex justify-center">
            <h1>Join Provider</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <div className="my-2">
                <h3>Services</h3>
                {services.map((service, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      className="input-field w-full ml-2 border border-gray-300 my-1 pl-2"
                      type="text"
                      value={service}
                      onChange={(e) => handleServiceChange(index, e.target.value)}
                      placeholder={`Service ${index + 1}`}
                    />
                    {
                      services.length > 1 && (
                        <button onClick={() => setServices(services.filter((_, i) => i != index))}
                          className=" rounded-xs text-red-600 text-2xl hover:cursor-pointer">-</button>
                      )
                    }
                  </div>
                ))}
                <div className="flex flex-row-reverse w-full ">
                  <button onClick={() => setServices([...services, ""])} type="button"
                    className=" w-fit text-green-500 text-2xl font-bold hover:cursor-pointer" >+</button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <h3>Location: </h3>
                  <input {...register("location")}
                    className="ml-2 border border-gray-300 pl-2" type="text" placeholder="Your location" />
                </div>
                <div>
                  <h3>Availability: </h3>
                  <input {...register("availability")}
                    className="ml-2 border border-gray-300 pl-2" type="text" placeholder="Available Time" />
                </div>
              </div>
            </div>
            <div className=" py-2 border px-2 mt-3 bg-gray-200 hover:bg-gray-100 hover:cursor-pointer" >
              <input onChange={handleChange} className="w-full text-center" type="file" accept="image" required />
            </div>
            <div className="mt-4">
              <button className="w-full py-1 rounded-xl hover:bg-green-500 bg-green-400 text-white" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </Overlay>
      <Overlay isOpen={edit} onClose={() => setEdit(false)}>
        <div>
          <form onSubmit={handleSubmit(editSubmit)}>
            <div>
              <h3>Name: </h3>
              <input value={name} onChange={(e) => setName(e.target.value)}
                className="ml-2 border border-gray-300 pl-2" type="text" placeholder="Your name" />
            </div>
            <div className="mt-2">
              <h3>Phone: </h3>
              <input value={phone} onChange={(e) => setPhone(e.target.value)}
                className="ml-2 border border-gray-300 pl-2" type="text" placeholder="Phone number" />
            </div>
            {user.role === 'provider' && (
              <div className="flex flex-col">
                <div>
                  <div className="my-2">
                    <h3>Services</h3>
                    {services.map((service, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          className="input-field w-full ml-2 border border-gray-300 my-1 pl-2"
                          type="text"
                          value={service}
                          onChange={(e) => handleServiceChange(index, e.target.value)}
                          placeholder={`Service ${index + 1}`}
                        />
                        {
                          services.length > 1 && (
                            <button onClick={() => setServices(services.filter((_, i) => i != index))}
                              className=" rounded-xs text-red-600 text-2xl hover:cursor-pointer">-</button>
                          )
                        }
                      </div>
                    ))}
                    <div className="flex flex-row-reverse w-full ">
                      <button onClick={() => setServices([...services, ""])} type="button"
                        className=" w-fit text-green-500 text-2xl font-bold hover:cursor-pointer" >+</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <h3>Location: </h3>
                      <input value={location} onChange={(e) => setLocation(e.target.value)}
                        className="ml-2 border border-gray-300 pl-2" type="text" placeholder="Your location" />
                    </div>
                    <div>
                      <h3>Availability: </h3>
                      <input value={available} onChange={(e) => setAvailable(e.target.value)}
                        className="ml-2 border border-gray-300 pl-2" type="text" placeholder="Available Time" />
                    </div>
                  </div>
                </div>
                <div className=" py-2 border px-2 mt-3 bg-gray-200 hover:bg-gray-100 hover:cursor-pointer" >
                  <input onChange={handleChange} className="w-full text-center" type="file" accept="image" />
                  <img src={image.url} className="h-10" alt="" />
                </div>
              </div>
            )}
            <div className="mt-4">
              <button className="w-full py-1 rounded-xl hover:bg-green-500 bg-green-400 text-white" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </Overlay>

      <div className="flex justify-center my-2">
        <h1 className="text-xl">Profile</h1>
      </div>
      <div>
        <h1 className="text-2xl">Hey {user.name}</h1>
      </div>
      {user.role === 'provider' && (
        <div className="flex flex-col my-2">
          <Link to="upcoming-services">
            <button className=" px-2 py-1 w-full rounded-xl border sm:w-fit">Your Bookings</button>
          </Link>
        </div>
      )
      }
      {user.role !== 'provider' && (
        <a onClick={() => setOpen(true)}
          className="underline text-blue-600 hover:cursor-pointer hover:text-blue-500">Are you a service Provider ?</a>
      )}
      <div className="flex flex-col my-2">
        <button className="bg-gray-400 text-white px-2 py-1 rounded-xl sm:w-fit hover:bg-gray-500" onClick={() => setEdit(true)}>Edit Profile</button>
      </div>
      <div className="flex flex-col gap-4">
        <button className="bg-red-400 text-white px-2 py-1 rounded-xl sm:w-fit hover:bg-red-500" onClick={logout}>Log Out</button>
      </div>
    </div >
  )
}
