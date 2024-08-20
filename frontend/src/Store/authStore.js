import {create} from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'

axios.defaults.withCredentials = true
export const useAuthStore =  create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    message:null,

    signup: async(email,password,name) =>{
        set({isLoading:true,error:null})
        try{
            const res = await axios.post(`${API_URL}/signup`,{email,password,name})
            set({user:res.data.user,isAuthenticated:true,isLoading:false})
        }
        catch(error){
            set({error:error.response.data.message || 'Unexpected error occured', isLoading:false})
            throw error
        }
    },

    verifyEmail: async(code) =>{
        set({isLoading:true,error:null})
        try {
            const res = await axios.post(`${API_URL}/verify-email`,{code})
            set({user:res.data.user,isAuthenticated:true,isLoading:false})
            
        } catch (error) {
            set({error:error.response.data.message || 'Unexpected error occured', isLoading:false})
            throw error 
        }
    },

    checkAuth: async()=>{
        await new Promise((resolve)=> setTimeout(resolve,1000))
        set({isCheckingAuth:true})
        try {
            const res = await axios.get(`${API_URL}/check-auth`)
            set({user:res.data.user,isAuthenticated:true,isCheckingAuth:false})
        } catch (error) {
            set({error:null,isCheckingAuth:false})
        }
    },

    login: async(email,password)=>{
        set({isLoading:true,error:null})
        try {
            const res = await axios.post(`${API_URL}/login`,{email,password})
            set({user:res.data.user,isLoading:false,isAuthenticated:true})
            
        } catch (error) {
            set({error:error.response.data.message || 'Unexpected error occured', isLoading:false})
            throw error 
        }
    },

    logout: async()=>{
        set({isLoading:true,error:null})
        try {
            await axios.post(`${API_URL}/logout`)
            set({user:null,isAuthenticated:false,error:null,isLoading:false})
        } catch (error) {
            set({error:'Error logging out', isLoading:false})
            throw error 
        }
    },

    forgotPassword : async(email) =>{
        set({isLoading:true,error:null,message:null})
        try {
            const res = await axios.post(`${API_URL}/forgot-password`,{email})
            set({message:res.data.message,isLoading:false})
        } catch (error) {
            set({message:error.response.data.message || 'Error sending password reset mail',isLoading:false})
            throw error
        }
    },
    
    resetPassword: async (token,password) => {
        set({isLoading:true,error:null})

        try {
            const res = await axios.post(`${API_URL}/reset-password/${token}`,{password})
            set({message:res.data.message,isLoading:false})
        } catch (error) {
            set({message:error.response.data.message || 'Error in resetting password',isLoading:false})
            throw error
        }
        
    }
}))

