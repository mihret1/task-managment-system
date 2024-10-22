import React, { useEffect, useState } from 'react'
import FileBase from 'react-file-base64';
import Navbar from '../components/Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; // MUI Loading Spinner
import {useNavigate,useParams} from 'react-router-dom'
import { TextField, Chip, Box } from '@mui/material';


function UpdateProjects() {
  const navigate=useNavigate()
  const {id}=useParams()

  // const [formData,setFormData]=useState({
  //   title:"",
  //   desc:"",
  //   deadline:null,
  //   startDate:null,
  //   status:'',
  //   projectImage:"",
  //   teamMembers:[],


  // })

    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [deadline,setDeadline]=useState(null)
    const [startDate,setStartDate]=useState(null)
    const [status,setStatus]=useState('')
    const [projectImage,setProjectImage]=useState("")
    const [ teamMembers,setTeamMembers]=useState([])
    const [ projectSchedule,setProjectSchedule]=useState([])

    const [scheduleInputValue, setScheduleInputValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [fieldControl,setFieldControl]=useState(false)
    const [errorr,setError]=useState(false)
    const [isLoading,setIsLoading]=useState(false)

    const falseDate = (date) => new Date() < date;

    const handleAddTeamMember = (event) => {
      if (event.key === 'Enter' && inputValue.trim()) {
        event.preventDefault();
        setTeamMembers([...teamMembers, inputValue.trim()]);
        setInputValue(''); 
      }
    };
  
    const handleDeleteTeamMember = (teamMemberToDelete) => {
      setTeamMembers((members) => members.filter((member) => member !== teamMemberToDelete));
    };

    const handleAddSchedule = (event) => {
      if (event.key === 'Enter' && scheduleInputValue.trim()) {
        event.preventDefault();
        setProjectSchedule([...projectSchedule, scheduleInputValue.trim()]);
        setScheduleInputValue(''); // Clear input field after adding
      }
    };

    const handleScheduleDelete = (scheduleToDelete) => {
      setProjectSchedule((schedules) =>schedules.filter((schedule) => schedule !== scheduleToDelete));
    };

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const token=localStorage.getItem('token') 

        setFieldControl(false)
        setError(false)
        setIsLoading(true)

        if(!title || !desc || !deadline || !startDate || !status || !projectImage){
          setFieldControl(true)
          setIsLoading(false)
          return
        }

        try{
          const {data}= await axios.put(`http://localhost:2000/project/${id}`,{title,desc,deadline,startDate,status,projectImage,teamMembers,projectSchedule},
            {
            headers:{Authorization:`Bearer ${token}`}
          })
          console.log(data)
          // setTitle('')
          // setDesc('')
          // setDeadline(null)
          // setStartDate(null)
          // setStatus('')
          // setProjectImage('')
          // setTeamMembers([])

          setIsLoading(false)
          setError(false)
          
         navigate('/')

        }catch(error){
          console.log(error)
          setIsLoading(false)
          setError(true)
        }
    }

    useEffect(()=>{
      const fetchProject=async()=>{
        try{
         const {data}= await axios.get(`http://localhost:2000/project/${id}`)
          setTitle(data.title)
          setDesc(data.desc)
          setDeadline(data.deadline)
          setStartDate(data.startDate)
          setStatus(data.status)
          setTeamMembers(data.teamMembers || [])
          setProjectSchedule(data.projectSchedule || [])
          setProjectImage(data.projectImage)
        }catch(error){
          console.log(error)
        }
      }
      fetchProject()
    },[id])
  
  return (
    <div>
        <Navbar />
        <div className='flex flex-col items-center justify-center pt-16'>
            <p className='text-3xl font-bold pb-7 text-green-700'>Update Project</p>
            <form onSubmit={handleSubmit} className='w-[600px] flex flex-col gap-4 '>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-semibold  '>Update Project title:</span>  
                <input value={title} onChange={(e)=>setTitle(e.target.value)}  className='w-full border-2 border-green-600 py-2 px-2 outline-cyan-500 ' type='text' placeholder='Title...'/>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-semibold  '>Update Project description:</span>  
                <textarea value={desc} onChange={(e)=>setDesc(e.target.value)}  className='w-full h-28 border-2 border-green-600 py-2 px-2 outline-cyan-500 ' type='text' placeholder='Description...'/>
              </div>
              <div className='w-full flex gap-3'>
                  <div className='flex flex-col gap-1 w-full'>
                    <span className='text-lg font-semibold  '>Update Start Date:</span>  
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
                      <span className='text-lg font-semibold '>Update Deadline:</span>  
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
                <span className='text-lg font-semibold  '>Update Project Status:</span>  
                <input value={status} onChange={(e)=>setStatus(e.target.value)}  className='w-full border-2 border-green-600 py-2 px-2 outline-cyan-500 ' type='text' placeholder='add status in from 100%'/>

              </div>            
              
              <div className='flex flex-col gap-1'>
              <span className='text-lg font-semibold  '>Update Team Members:</span>  

                <Box className='w-full'>
                    <TextField
                     className='w-full '
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleAddTeamMember}
                      variant="outlined"
                      placeholder='add team member'
                      sx={{
                        border: '2px solid #16a34a', 
                        outline: 'none',
                        '&:focus-within': {
                          outline: '2px solid #06b6d4',
                        },
                      }}
                    />
                    <Box mt={2}>
                      {teamMembers.map((member, index) => (
                        <Chip
                          key={index}
                          label={member}
                          onDelete={() => handleDeleteTeamMember(member)}
                          sx={{ marginRight: 1, marginBottom: 1 }}
                        />
                      ))}
                    </Box>
                </Box>
              </div> 

              <div className='flex flex-col gap-1'>
              <span className='text-lg font-semibold  '>Add Schedules:</span>  

                <Box className='w-full'>
                    <TextField
                     className='w-full '
                      value={scheduleInputValue}
                      onChange={(e) => setScheduleInputValue(e.target.value)}
                      onKeyDown={handleAddSchedule}
                      variant="outlined"
                      placeholder='add schedule'
                      sx={{
                        border: '2px solid #16a34a', 
                        outline: 'none',
                        '&:focus-within': {
                          outline: '2px solid #06b6d4',
                        },
                      }}
                    />
                    <Box mt={2}>
                      {projectSchedule.map((schedule, index) => (
                        <Chip
                          key={index}
                          label={schedule}
                          onDelete={() => handleScheduleDelete (schedule)}
                          sx={{ marginRight: 1, marginBottom: 1 }}
                        />
                      ))}
                    </Box>
                </Box>
              </div>

              <div className='flex flex-col gap-1'>
                  <span className='text-lg font-semibold'>Update Project Image:</span>  
                  <FileBase 
                    type='file'
                    multiple={false}
                    onDone={({base64})=>setProjectImage(base64)}
                />             
              </div> 
               

               {isLoading && <div className='flex justify-center'><CircularProgress /></div>}
              <button type='submit' className='bg-green-600 py-2 text-2xl font-serif font-semibold'>Update</button>
              { errorr && <p className='text-red-600 text-center text-lg'>sorry, failed try again!</p>}
              { fieldControl && <p className='text-red-600 text-center text-lg'>Enter all Fields</p>}

            </form>
        </div>
       
    </div>
  )
}

export default UpdateProjects