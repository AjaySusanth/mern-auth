import bcrypt from "bcryptjs/dist/bcrypt.js";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeMail } from "../mailtrap/emails.js";

export const signup = async(req,res)=>{
    const {email,password,name} = req.body;
    try{
        if (!email || !password || !name){
            throw new Error("All fields are required")
        }

        const userExist = await User.findOne({email})
        if (userExist){
            return res.status(400).json({success:false,message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        const user  =  new User({
            name,
            email,
            password:hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24hr
        })
        await user.save()
        
        generateTokenAndSetCookie(res,user._id)
       await sendVerificationEmail(user.email,verificationToken)

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                ...user._doc,
                password:undefined,
            }
        })

    }
    catch(error){
        return res.status(400).json({success:false,message:error.message})
    }
}

export const verifyEmail = async (req,res) =>{
    const {code} = req.body

    try{
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{ $gt :Date.now()}
        })
    
        if (!user){
            console.log(code)
            return res.status(400).json({success:false,message:"Invalid or Expired token"})
        }
    
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
    
        await user.save()
        await sendWelcomeMail(user.name,user.email)

        res.status(200).json({
            success:true,
            message:"Email verified successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })
    }
    catch(error){
        console.log("Error in email verification",error)
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}

export const login = async(req,res)=>{
    res.send("login route")
}
export const logout = async(req,res)=>{
    res.send("logout route")
}