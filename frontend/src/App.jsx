import { Navigate, Route, Routes } from "react-router-dom"
import FloatingShape from "./Components/FloatingShape"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import EmailVerification from "./Pages/EmailVerification"
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from "./Store/authStore"
import { useEffect } from "react"
import Home from "./Pages/Home"
import LoadingSpinner from "./Components/LoadingSpinner"
import ForgotPassword from "./Pages/ForgotPassword"
import ResetPassword from "./Pages/ResetPassword"

// Protect routes that require authentication

const ProtectedRoute = ({children})=>{
  const {isAuthenticated,user} = useAuthStore()

  if (!isAuthenticated){
     return <Navigate to='/login' replace/>
  }
  if(!user.isVerified){
    return <Navigate to='/verify-email' replace/>
  }

  return children
}

// Redirect authenticated user to home page
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated,user} = useAuthStore()

  if (isAuthenticated && user.isVerified)
  {
    return <Navigate to='/' replace/>
  }
  return children;
}
const App = () => {

  const {isCheckingAuth,checkAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])


  if(isCheckingAuth) return <LoadingSpinner/>

  return (

    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <Home/>
        </ProtectedRoute>}/>
        <Route path="/signup" element={<RedirectAuthenticatedUser>
          <Signup/>
        </RedirectAuthenticatedUser>}/>
        <Route path="/login" element={<RedirectAuthenticatedUser>
          <Login/>
        </RedirectAuthenticatedUser>}/>
        <Route path="/verify-email" element={<EmailVerification/>}/>
        <Route path="/forgot-password" element={<RedirectAuthenticatedUser>
          <ForgotPassword/>
        </RedirectAuthenticatedUser>}/>
        <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser>
          <ResetPassword/>
        </RedirectAuthenticatedUser>}>

        </Route>
      </Routes>
      <Toaster/>
    </div>
  )
}
export default App
