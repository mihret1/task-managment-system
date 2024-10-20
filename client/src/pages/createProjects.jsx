
import React, { useState } from 'react'
import FileBase from 'react-file-base64';
import Navbar from '../components/Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // MUI Loading Spinner
import {useNavigate} from 'react-router-dom'
// import ChipInput from 'material-ui-chip-input';
import Chip from '@mui/material/Chip';


function CreateProjects() {
  const navigate=useNavigate()

    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [deadline,setDeadline]=useState(null)
    const [startDate,setStartDate]=useState(null)
    const [status,setStatus]=useState('')
    const [projectImage,setProjectImage]=useState("")
    const [ teamMembers,setTeamMembers]=useState([])

    const [fieldControl,setFieldControl]=useState(false)
    const [errorr,setError]=useState(false)
    const [isLoading,setIsLoading]=useState(false)

    const falseDate = (date) => new Date() < date;
    const handleSubmit=async(e)=>{
        const token=localStorage.getItem('token') 
        e.preventDefault()
        
        setError(false)
        setFieldControl(false)
        setIsLoading(true)

        if(!title || !desc || !deadline || !startDate || !status || !projectImage){
          setFieldControl(true)
          setIsLoading(false)
          return
        }
        try{
          const {data}= await axios.post('http://localhost:2000/project/',{title,desc,deadline,startDate,status,projectImage},{
            headers:{Authorization:`Bearer ${token}`}
          })
          console.log(data)
          setTitle('')
          setDesc('')
          setDeadline(null)
          setStartDate(null)
          setStatus('')
          setProjectImage('')

          setIsLoading(false)
          setError(false)
          
         navigate('/')

        }catch(error){
          console.log(error)
          setIsLoading(false)
          setError(true)
        }
    }
  
  return (
    <div>
        <Navbar />
        <div className='flex flex-col items-center justify-center pt-16'>
            <p className='text-3xl font-bold pb-7 text-green-700'>Create Project</p>
            <form onSubmit={handleSubmit} className='w-[600px] flex flex-col gap-4 '>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-semibold  '>Add Project title:</span>  
                <input value={title} onChange={(e)=>setTitle(e.target.value)}  className='w-full border-2 border-green-600 py-2 px-2 outline-cyan-500 ' type='text' placeholder='Title...'/>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-semibold  '>Add Project description:</span>  
                <textarea value={desc} onChange={(e)=>setDesc(e.target.value)}  className='w-full h-28 border-2 border-green-600 py-2 px-2 outline-cyan-500 ' type='text' placeholder='Description...'/>
              </div>
              <div className='w-full flex gap-3'>
                  <div className='flex flex-col gap-1 w-full'>
                    <span className='text-lg font-semibold  '>Add Start Date:</span>  
                    <DatePicker
                      selected={startDate}
                      onChange={(date)=>setStartDate(date)}
                      className='border-2 border-green-600 w-full py-2 outline-cyan-500 px-2 '
                      isClearable
                      filterDate={falseDate}
                      placeholderText='start date'
                      showIcon
                      toggleCalendarOnIconClick
                      closeOnScroll={true}  
                    />     
                  </div>
                  <div className='flex flex-col max-md:flex gap-1 w-full'>
                      <span className='text-lg font-semibold '>Add Deadline:</span>  
                      <DatePicker
                        selected={deadline}
                        onChange={(date)=>setDeadline(date)}
                        className='border-2 border-green-600 w-full py-2 outline-cyan-500 px-2 '
                        isClearable
                        filterDate={falseDate}
                        placeholderText='deadline'
                        showIcon
                        toggleCalendarOnIconClick
                        closeOnScroll={true}  
                      />     
                  </div>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-semibold  '>Add Project Status:</span>  
                <input value={status} onChange={(e)=>setStatus(e.target.value)}  className='w-full border-2 border-green-600 py-2 px-2 outline-cyan-500 ' type='text' placeholder='add status in from 100%'/>

              </div>            
              <div className='flex flex-col gap-1'>
                  <span className='text-lg font-semibold'>Add Project Image:</span>  
                  <FileBase 
                    type='file'
                    multiple={false}
                    onDone={({base64})=>setProjectImage(base64)}
                />             
              </div>
             
               {/* <ChipInput
                 label='tags'
                 value={teamMembers}
                 onAdd={(chip)=>{}}
                 onDelete={(chip)=>{}}
               /> */}

               {isLoading && <div className='flex justify-center'><CircularProgress /></div>}
              <button type='submit' className='bg-green-600 py-2 text-2xl font-serif font-semibold'>Create</button>
              { fieldControl && <p className='text-red-600 text-center text-lg'>Enter all Fields</p>}
              { errorr && <p className='text-red-600 text-center text-lg'>sorry, failed try again!</p>}
            
            </form>
        </div>
       
    </div>
  )
}

export default CreateProjects