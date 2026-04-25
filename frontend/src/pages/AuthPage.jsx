import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import api from "../api/api.js"
import { useNavigate } from "react-router-dom"

export default function AuthPage() {
  const [auth, setAuth] = useState("login")
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  async function onSubmit(data) {
    try {
      if (auth === 'signup') {
        const res = await api.post('/user/signup', {
          name: data.name,
          password: data.password,
          phone: data.phone,
          role: data.role
        })
        toast.success(res.data.message)
        setAuth('login')
      } else {
        const res = await api.post('/user/login', {
          phone: data.phone,
          password: data.password
        })
        localStorage.setItem("token", res.data.token)
        toast.success(res.data.message)
        navigate('/')
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  }
  return (
    <div className="h-screen flex bg-custom-purple">
      <div className="bg-custom-purple w-1/2 flex justify-center items-center max-sm:hidden">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-6xl pl-8">Join Our Local Service Network</h1>
          <div className="pl-8 text-gray-200">
            <ul>
              <li>Electricians, plumbers and more -- verified and ready to help</li>
              <li>Book reliable services in Karuvarakundu</li>
              <li>Quick, simple and local service booking</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 p-8 flex sm:w-1/2 sm:rounded-l-4xl w-full justify-center items-center">
        <div className="flex flex-col gap-2">
          {auth === 'login' ? (
            <button onClick={() => setAuth('signup')} className="fixed top-7 max-sm:top-5 right-7 max-sm:right-5 text-gray-700 py-2 px-3 rounded-2xl">Sign Up</button>
          ) : (
            <button onClick={() => setAuth('login')} className="fixed top-7 max-sm:top-5 right-7 max-sm:right-5 text-gray-700 py-2 px-3 rounded-2xl">Log In</button>
          )}
          <h1 className="text-4xl max-sm:text-3xl font-black">
            {auth === 'login' ? (
              'Log in'
            ) : (
              'Sign Up'
            )}
          </h1>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                {auth === 'signup' && (
                  <div className="flex flex-col">
                    <label className="text-gray-600">Name</label>
                    <input type="text" placeholder="Your full name" {...register("name", {
                      required: "Name is required",
                    })}
                      className="bg-white text-gray-700 w-fit py-2 px-3 rounded-2xl" />
                    {errors.name && (
                      <p className="error-p">{errors.name.message}</p>
                    )}
                  </div>
                )}
                <div className="flex flex-col">
                  <label className="text-gray-600">Phone</label>
                  <input type="number" placeholder="phone number" {...register("phone", {
                    required: "Phone number is required",
                    minLength: {
                      value: 10,
                      message: "Phone number must be exactly 10 digits"
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone number must be exactly 10 digits"
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: "Only numbers are allowed"
                    }
                  })}
                    className="bg-white text-gray-700 w-fit py-2 px-3 rounded-2xl" />
                  {errors.phone && (
                    <p className="error-p">{errors.phone.message}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-600">Password</label>
                  <input type="password" placeholder="password" {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be 8 characters"
                    },
                    maxLength: {
                      value: 12,
                      message: "Password must be under 12 characters"
                    }
                  })}
                    className="bg-white text-gray-700 w-fit py-2 px-3 rounded-2xl" />
                  {errors.password && (
                    <p className="error-p">{errors.password.message}</p>
                  )}
                </div>
                {auth === 'signup' && (
                  <div className="flex flex-col">
                    <p className="text-gray-600">Role</p>
                    <div className="flex gap-4">
                      <div>
                        <input type="radio" value="user" defaultChecked {...register("role")}
                          className="mr-2 w-fit" />
                        <label>
                          User
                        </label>
                      </div>
                      <div>
                        <input type="radio" value="provider" {...register("role")}
                          className="mr-2 w-fit" />
                        <label>
                          Provider
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <button type="submit"
                    className="w-full bg-custom-orange text-white py-2 rounded-2xl">
                    {auth === 'login' ? (
                      'Sign In'
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}
