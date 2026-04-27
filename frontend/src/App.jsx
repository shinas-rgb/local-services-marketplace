import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './route/ProtectedRoute'
import AdminPanel from './pages/AdminPanel'
import Users from './components/admin/Users'
import Admin from './components/admin/Admin'
import Services from './components/admin/Services'

function App() {

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/Profile' element={<ProfilePage />} />
        <Route path='/admin' element={<AdminPanel />}>
          <Route index element={<Admin />} />
          <Route path='users' element={<Users />} />
          <Route path='services' element={<Services />} />
        </Route>
      </Route>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthPage />} />
    </Routes>
  )
}

export default App
