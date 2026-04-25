import { useState } from "react"
import { checkUser } from "../utils/Auth"
import { Link } from "react-router-dom"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const user = checkUser()
  return (
    <div>
      <div className="flex justify-between p-2">
        <h1 className="text-3xl">Brand</h1>
        {user ? (
          <div className="max-sm:hidden flex gap-4 text-xl">
            <button>Bookings</button>
            <button>Services</button>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
          </div>
        ) : (
          <div className="max-sm:hidden text-xl">
            <Link to="auth">
              <button>Login</button>
            </Link>
          </div>
        )}
        <div className="sm:hidden">
          <button onClick={() => setIsOpen(true)}>
            <svg className="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" /></svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
          }}
        >
        </div>
      )
      }
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "250px",
          background: "#fff",
          boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 10,
        }}
        className="pt-12"
      >
        <button className="font-extrabold fixed right-3 top-3" onClick={() => setIsOpen(false)}>X</button>
        <div className="flex flex-col gap-4 items-start m-4">
          <h1>Menu</h1>
          <button>Profile</button>
          <button>Bookings</button>
          <button>Services</button>
        </div>
      </div>
    </div >
  )
}
