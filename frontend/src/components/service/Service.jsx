import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import api from "../../api/api.js"

export default function Service() {
  const { name } = useParams()
  const [loading, setLoading] = useState(true)
  const [service, setService] = useState(null)
  const [providers, setProviders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/service/${name}`)
        setService(res.data)
        const providerRes = await api.get(`provider/service/${name}`)
        setProviders(providerRes.data)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        toast.error(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center text-center">
      <h1>Loading...</h1>
    </div>
  }

  return (
    <div className="mx-2">
      <div className="flex justify-center my-4">
        <h1 className="text-xl">{service.name} services near you</h1>
      </div>
      {providers.length > 0 ? (
        <>
          <div className="flex flex-col sm:grid sm:grid-cols-4 sm:mt-8 gap-2">
            {providers.map((p) => (
              <Link key={p._id} to={`${p.userId}`}>
                <div className="w-full border-2 border-violet-700 hover:bg-violet-500 bg-violet-600 text-white px-2 py-2 flex justify-between">
                  <div>
                    <h1 className="font-bold text-xl">{p.name}</h1>
                    <p>Available: {p.availability}</p>
                    <p>Location: {p.location}</p>
                    <p>Rating: {p.rating}</p>
                  </div>
                  <div>
                    <img src={p.image.url} alt="" className="h-18" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <h1>No Providers</h1>
      )
      }
    </div >
  )
}
