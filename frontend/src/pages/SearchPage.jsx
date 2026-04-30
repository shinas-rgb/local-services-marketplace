import { Link, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import api from "../api/api";
import SearchBar from "../components/SearchBar";

export default function SearchPage() {
  const [searhcParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [providers, setProviders] = useState([])
  const q = (searhcParams.get("q"))

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await api.get('provider/all', {
          params: q ? { q } : {}
        })
        setProviders(res.data)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [searhcParams])

  if (loading) {
    return <div className="flex justify-center text-xl items-center h-screen">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="mx-2">
      <NavBar />
      <SearchBar />
      {providers.length > 0 ? (
        <div className="flex flex-col sm:grid sm:grid-cols-4 sm:mt-8 gap-2">
          {providers.map((provider) => (
            <div key={provider._id} >
              <Link key={provider._id} to={`/${provider.name}`}>
                <div className="w-full border-2 border-violet-700 hover:bg-violet-500 bg-violet-600 text-white px-2 py-2 flex justify-between">
                  <div>
                    <h1 className="font-bold text-xl">{provider.name}</h1>
                    <p>Available: {provider.availability}</p>
                    <p>Location: {provider.location}</p>
                    <p>Rating: {provider.rating}</p>
                  </div>
                  <div>
                    <img src={provider.image.url} alt="" className="h-18" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No providers found</p>
      )
      }
    </div >
  )
}
