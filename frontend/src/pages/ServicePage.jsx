import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function ServicePage() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
