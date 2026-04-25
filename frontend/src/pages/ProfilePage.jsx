import { useState } from "react"
import { checkUser } from "../utils/Auth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ProfilePage() {
  const [user, setUser] = useState(checkUser())
  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem("token")
    setUser(null)
    toast.success("Logout successfully")
    navigate('/')
  }
  return (
    <div>
      <h1>Hey {user.name}</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}
