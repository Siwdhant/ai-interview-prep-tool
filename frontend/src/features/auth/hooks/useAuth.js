import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../auth.context.jsx';
import {login,register,logout,getMe} from '../services/auth.api.js';

export const useAuth = () => {
    const navigate=useNavigate()
    const context=useContext(AuthContext)
    const {user,setUser,loading,setLoading}=context

   

const handlelogin=async({email,password})=>{
    setLoading(true)
    try{
        console.log("Sending:", email, password)
        const data=await login({email,password})
        setUser(data.user)
        setLoading(false)
        navigate('/') 
    }catch(err){
        setLoading(false)
        console.log(err)
    } 
}

  const handleRegister=async({username,email,password})=>{
   setLoading(true)
   try{

     const data=await register({username,email,password}) 
     setUser(data.user)
     setLoading(false)
    }catch(err){
        setLoading(false)
        console.log(err)
    }
}

const handleLogout=async()=>{
      setLoading(true)
      try{

        const data=await logout()
        setUser(null)
        setLoading(false)
      }catch(err){
        setLoading(false)
        console.log(err)
      } 

}
  return {
    user,
    loading,
    handlelogin,
    handleRegister,
    handleLogout
  }
}