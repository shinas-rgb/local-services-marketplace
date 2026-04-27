import { NavLink, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function AdminPanel() {
  return (
    <div className="h-screen">
      <NavBar />
      <div className="">
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
