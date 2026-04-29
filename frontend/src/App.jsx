import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './route/ProtectedRoute'
import AdminRoute from "./route/adminRoute.jsx"
import AdminPanel from './pages/AdminPanel'
import Users from './components/admin/Users'
import Admin from './components/admin/Admin'
import Services from './components/admin/Services'
import ServicePage from './pages/ServicePage'
import ProviderPage from './components/service/ProviderPage'
import Service from './components/service/Service'
import BookingsPage from './pages/BookingsPage'
import Profile from './components/profile/Profile'
import MyBookings from './components/profile/MyBookings'
import AllServicesPage from './pages/AllServicesPage'
import Bookings from './components/admin/Bookings'
import SearchPage from './pages/SearchPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/Profile' element={<ProfilePage />}>
          <Route index element={<Profile />} />
          <Route path='upcoming-services' element={<MyBookings />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/admin' element={<AdminPanel />}>
            <Route index element={<Admin />} />
            <Route path='users' element={<Users />} />
            <Route path='services' element={<Services />} />
            <Route path='bookings' element={<Bookings />} />
          </Route>
        </Route>
        <Route path='bookings' element={<BookingsPage />} />
      </Route>
      <Route path='/' element={<HomePage />} />
      <Route path='service/:name' element={<ServicePage />} >
        <Route index element={<Service />} />
        <Route path=':id' element={<ProviderPage />} />
      </Route>
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/all-services' element={<AllServicesPage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
