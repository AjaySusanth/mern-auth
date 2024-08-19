import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { connectDB } from './db/connectDB.js'
import authRoutes from './routes/auth.route.js'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000

app.use(cors({origin:'http://localhost:5173',credentials:true}))

app.use(express.json())
app.use(cookieParser()) 
// All the middlewares has to be defined above the router

app.use('/api/auth',authRoutes) // setting routes


app.listen(PORT,()=>{
    connectDB()
    console.log("Server running")
})

