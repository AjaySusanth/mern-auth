import { motion } from "framer-motion"
import { useState } from "react"
import { Mail,Loader,Lock} from "lucide-react"
import Input from "../Components/Input"
import { Link } from "react-router-dom"

const Login = () => {

  const handleLogin = (e) =>{
    e.preventDefault()
  }

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const isLoading = false

  return (
    <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className=" max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl"
    >

      <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
              Welcome Back
          </h2>
          <form onSubmit={handleLogin}>
            <Input
              type='email'
              placeholder='Email Address'
              icon={Mail}
              value={email}
              onChange = {(e)=>setEmail(e.target.value)}
            />

            <Input
              type='password'
              placeholder='Password'
              icon={Lock}
              value={password}
              onChange = {(e)=>setPassword(e.target.value)}
            />
          </form>

          <div className="flex items-center mb-3">
            <Link to='/forgot-password' className="text-sm text-green-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{scale:1.02}}
            whileTap={{scale:0.98}}
            type="submit"
          >
            {isLoading ? <Loader className="size-5 animate-spin mx-auto"/> : "Login"}
          </motion.button>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                to={'/signup'}
                className="text-green-500 hover:underline">
                   Sign up
                </Link>
            </p>
        </div>

    </motion.div>
  )
}
export default Login