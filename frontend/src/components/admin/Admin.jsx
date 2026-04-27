import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div>

      <div className="flex justify-center my-2">
        <h1 className="text-2xl">Admin Panel</h1>
      </div>
      <div className="flex justify-center my-8">
        <div className="flex flex-col gap-4">
          <button>
            <Link to="users">
              Users
            </Link>
          </button>
          <button>Providers</button>
          <button>
            <Link to="services">
              Services
            </Link>
          </button>
          <button>Bookings</button>
        </div>
      </div>
    </div>
  )
}
