import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Auth() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [isSignup,setIsSignup]=useState(true)
  const [fieldControl,setFieldControl]=useState(false)
  const [loading,setLoading]=useState(false)
  const [errors,setError]=useState(false)
  const [errorMessage,setErrorMessage]=useState('')
  const navigate=useNavigate()

  const Signup=async(e)=>{
    e.preventDefault()
    setFieldControl(false)
    setError(false)
    setErrorMessage('')
    try{
       if(!name || !email || !password){
        setFieldControl(true)
        return
       }
       const {data}= await axios.post('http://localhost:2000/user/signup',{name,email,password})
       localStorage.setItem('token',data.token)
        setName('')
        setEmail('')
        setPassword('')
        setError(false)
        setErrorMessage('')
        console.log(data)
        navigate('/')
      }catch(error){
        setError(true)
        setErrorMessage(error.response.data)
      console.log(error)
    }

  }

  const Login=async(e)=>{
    e.preventDefault()
    setFieldControl(false)
    setError(false)
    setErrorMessage('')
    try{
       if(!email || !password){
        setFieldControl(true)
        return
       }
       const {data}= await axios.post('http://localhost:2000/user/login',{email,password})
       localStorage.setItem('token',data.token)
        setEmail('')
        setPassword('')
        setError(false)
        setErrorMessage('')
        console.log(data)
        navigate('/')
      }catch(error){
        setError(true)
        setErrorMessage(error.response.data)
      console.log(error)
    }

  }

  return (
    <div className='flex flex-col items-center justify-center  h-[630px] gap-3'>
      <p className='text-3xl font-bold text-cyan-500 pb-10'>Task Management System</p>
      <p className='text-2xl font-bold text-gray-500'>{isSignup? 'Login':'Signup'} to the System</p>
      <form onSubmit={isSignup?Login :Signup } className='flex flex-col gap-2 w-[420px]'>
       {!isSignup && <input className='border-2 py-2 px-2 outline-cyan-500 ' type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='enter name...' />}        <input className='border-2 py-2 px-2 outline-cyan-500 ' type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter email...' />
        <input className='border-2 py-2 px-2 outline-cyan-500 ' type='text' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter password...'/>
        <button className='bg-cyan-500 text-xl text-white py-2 ' type='submit'>{!isSignup? 'Signup':'Login'}</button>
        {fieldControl && <p className='text-center text-red-600 text-lg'>Enter all Field</p>}
        {(errors && !errorMessage) && <p className='text-center text-red-600 text-lg' >Sorry, Failed try again!</p>}
        {(errors && errorMessage) && <p className='text-center text-red-600 text-lg' >{errorMessage}</p>}

        <p className='text-center text-lg py-2 font-semibold'>{!isSignup ? 'have already account ? ':'don`t have an account ? '} <button type='button' onClick={()=>setIsSignup((e)=>!e)} className='text-cyan-600'>{!isSignup?'Login':'Signup'}</button> </p>
      
      </form>
    </div>
  )
}


export default Auth