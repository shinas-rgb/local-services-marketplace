import { Outlet } from "react-router-dom"
import { checkUser } from "../utils/Auth"

const adminRoute = () => {
  const user = checkUser()
  return user.role === 'admin' ? <Outlet /> : <div className="h-screen flex justify-center content-centere">
    <h1>Admin Access Only</h1>
  </div>
}

export default adminRoute
