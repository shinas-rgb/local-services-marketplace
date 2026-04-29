import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import api from "../../api/api"
import arrow from "../../assets/images/left-arrow.png"
import { Link } from "react-router-dom"

export default function Users() {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/user/all`, {
          params: role ? { role } : {}
        })
        setUsers(res.data)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.error(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [role])

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
        <h1 className="text-2xl">Users</h1>
      </div>
      <div className="bg-gray-600 w-fit py-1 px-2 my-2 text-white">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All Users</option>
          <option value="user">Users</option>
          <option value="provider">Providers</option>
          <option value="admin">Admins</option>
        </select>
      </div>
      <div>
        <table className="table-auto text-left border">
          <thead>
            <tr className="border bg-custom-purple">
              <th className="px-3 py-4 border">Name</th>
              <th className="px-3 py-4 border">Phone</th>
              <th className="px-3 py-4 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="border">
                <td className="py-3 px-4 border">
                  {user.name}
                </td>
                <td className="py-3 px-4 border">{user.phone}</td>
                <td className="py-3 px-4 border">{user.role}</td>
              </tr>
            ))}
            <tr>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
