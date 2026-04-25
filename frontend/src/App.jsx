import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './route/ProtectedRoute'

function App() {

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/Profile' element={<ProfilePage />} />
      </Route>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthPage />} />
    </Routes>
  )
}

export default App
