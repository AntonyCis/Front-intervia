import { BrowserRouter, Route, Routes } from 'react-router'
import Home  from './pages/Home'
import Login from './pages/Login'
import { Register } from './pages/Register'
import { Forgot } from './pages/Forgot'
import { Confirm } from './pages/Confirm'
import { NotFound } from './pages/NotFound'
import Dashboard from './layout/Dashboard'
import Profile from './pages/Profile'
import List from './pages/List'
import Details from './pages/Details'
import Create from './pages/Create'
import Update from './pages/Update'
import Chat from './pages/Chat'
import Reset from './pages/Reset'
import Panel from './pages/Panel' 
import Pricing from './pages/Pricing'
import Checkout from './pages/Checkout'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import { useEffect } from 'react'
import storeProfile from './context/storeProfile'
import storeAuth from './context/storeAuth'
import LoginSuccess from './pages/LoginSuccess'
import UserTable from './components/dashboard/UserTable'
import GlobalStats from './components/dashboard/GlobalStats'



function App() {
  const { profile} = storeProfile()
  const { token } = storeAuth()

  useEffect(() => {
    if (token) {
      profile()
    }
  }, [token])

  return (
    <>
<BrowserRouter>
  <Routes>
    {/* Rutas públicas */}
    <Route element={<PublicRoute />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="login-success" element={<LoginSuccess />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot/:id" element={<Forgot />} />
      <Route path="confirmar/:token" element={<Confirm />} />
      <Route path="reset/:token" element={<Reset />} />
      <Route path="recuperarpassword/:token" element={<Reset />} />
      <Route path="*" element={<NotFound />} />
    </Route>

    {/* Rutas protegidas */}
    <Route path="dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }>
      <Route index element={<Panel />} />
      <Route path="profile" element={<Profile />} />
      <Route path="users" element={<UserTable />} />
      <Route path="stats" element={<GlobalStats />} />
      <Route path="list" element={<List />} />
      <Route path="details/:id" element={<Details />} />
      <Route path="create" element={<Create />} />
      <Route path="update/:id" element={<Update />} />
      <Route path="chat/:id" element={<Chat />} />
      <Route path="plans" element={<Pricing />} />
      <Route path="checkout" element={<Checkout />} />
    </Route>
  </Routes>
</BrowserRouter>

    </>
  )
}

export default App
