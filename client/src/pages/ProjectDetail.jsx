
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import img1 from '../assets/p1.png'
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { jwtDecode } from 'jwt-decode'
import Groups2Icon from '@mui/icons-material/Groups2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const ProjectDetailPage=()=>{
    const [displayControl,setDisplayControl]=useState(1)
    const [project,setProject]=useState(null)
    const [tasks,setTasks]=useState(null)
    const [refresh,setRefresh]=useState(false)
    const token=localStorage.getItem('token')
    const decode=jwtDecode(token)
    const [issue,setIssue]=useState({ desc:'', status: 'issued' });
    const [projectIssue,setProjectIssue]=useState([])
    const [addIssueButton,setAddIssueButton]=useState(false)
    const { id }=useParams()
    const [isUpdate,setIsUpdate]=useState(false)
    
    useEffect(()=>{
      const projectDetail=async()=>{
           try{
              const {data}= await axios.get(`http://localhost:2000/project/${id}`)
                setProject(data)
                setTasks(data?.projectTasks)
                setProjectIssue(data.projectIssue)

               //  console.log(data?.projectTasks)
               //  console.log(data)
           }catch(error){
               console.log(error)
           }
      }
      projectDetail()
   },[id,refresh])
   
    
    const handleDelete=async(taskId)=>{
      try{
         const {data}=await axios.delete(`http://localhost:2000/project/${id}/task/${taskId}`,
          {headers:{Authorization:`Bearer ${token}`}}

         )
         console.log(data)
         setRefresh((e)=>!e)
      }catch(error){
        console.log(error)
      }

    }
    

      const TaskCard=(props)=>{
        const [isOpen, setIsOpen] = useState(false);
        const togglePopup = () => {
          setIsOpen(!isOpen);
        }
       
        const [anchorEl, setAnchorEl] = useState(null);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };      
        const handleClose = () => {
          setAnchorEl(null);
        };     
        const open = Boolean(anchorEl);
    
        return(
            <div className='flex flex-col p-3 gap-2   w-[330px]  bg-gray-200 rounded-lg shadow-lg'>
              <div className='flex justify-between w-full'>
                    <span className='text-gray-600 font-semibold'>{props.title}</span>
                    <span><Button onClick={handleClick} color='black'><MoreHorizIcon/> </Button> </span>
                    <Popover
                        
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                       >
                        <div className='p-2 flex flex-col gap-2'>
                             <span><button className='text-red-500 border-b-2 pb-2' onClick={()=>{handleDelete(props.taskId)}}>Delete</button></span>
                             <span><a href={`/project/${id}/updatetask/${props.taskId}`} className='text-blue-500'>Edit</a></span>
                        </div>
                    </Popover>
              </div>
              <div className='flex flex-col  gap-2  h-[440px]  overflow-y-scroll' style={{ scrollbarWidth: 'none',  msOverflowStyle: 'none', }}>

                  <div className='h-[240px] bg-white rounded-lg shadow-md '>
                    <div className='h-12 bg-gray-500 rounded-t-lg'>
                    </div>
                    <p className='px-3 pt-1 font-semibold text-green-600'>Progress : {props.status}</p>
                    <button  onClick={togglePopup} className='px-3 py-2 text-gray-700 text-left w-[320px]'>{props.desc?.slice(0,180)}</button>
                  </div>

                  {isOpen && (
                            <div className="fixed top-0 left-0 w-full overflow-y-scroll h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg px-[5%] mx-20 overflow-y-scroll">
                                <h2 className="text-lg font-semibold">{props.title && props.title}</h2>
                                <p className="mt-4">{props.title && props.desc}</p>
                                <button
                                onClick={togglePopup}
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                                >
                                Close
                                </button>
                            </div>
                            </div>
                   )}
                                    
                   <div className='flex justify-between bg-white rounded-lg shadow-lg px-3 py-2 '>
                     <div className='flex flex-col '>
                        <span className='text-blue-400 font-semibold'>Start date</span>
                        <span className=' text-gray-500 font-semibold'>{props.startDate?.slice(0,10)}</span>
                    </div>
                     <div className='flex flex-col '>
                        <span className='text-red-400 font-semibold'>Deadline</span>
                        <span className='text-gray-500 font-semibold'>{props.deadline?.slice(0,10)}</span>
                     </div>
                   </div>

                   <div className='flex flex-col gap-1 rounded-lg bg-white px-3 py-2 text-gray-700 shadow-lg' >
                    <span className=' text-gray-600 font-semibold border-b pb-1'>Team Members</span>
                      {
                      
                      Array.isArray(props.teamMemeber) && props.teamMemeber.length >0  ? props.teamMemeber?.map((item)=>(
                       <span key={item.key} >{item}</span>
                      )) :<span> no team member assigned</span>
                      
                      }
                  

                   </div>

                   <div>
                    <img className='' src={props.images}/>
                   </div>
              </div>

            </div>
        )
      }
    
   
   
   const handleAddIssue=async()=>{
      if (issue.desc.trim() === '') return;
       try{
        const {data}=await axios.put(`http://localhost:2000/project/${id}`,{projectIssue:[...projectIssue,issue]},
          {
          headers:{Authorization:`Bearer ${token}`}
          })
         setProjectIssue(data.projectIssue)
         setIssue({desc:'',status:''})
         setRefresh((e)=>!e)
         console.log(data)
        
       }catch(error){
        console.log(error)
       }
 
   }


  const handleUpdatIssueButton=({item})=>{
    setIsUpdate(true)
    setAddIssueButton(true)
    setIssue(item)
    // console.log(item)
    // console.log(issue)


  }

  //  const handleUpdateIssue=async({item})=>{
  //   if (issue.desc.trim() === '') return;
    
  //    try{
  //     // const id=item._id      
  //     const updatedIssue=projectIssue?.map((iss)=>iss._id===item._id ? {...iss,desc:issue.desc,status:issue.status}:iss)

  //     const { data }=await axios.put(`http://localhost:2000/project/${id}`,{projectIssue:updatedIssue},
  //       {headers:{Authorization:`Bearer ${token}`}})
  //       console.log(data)
  //       setRefresh((e)=>!e)

  //     }catch(error){
  //     console.log(error)
  //    }
  //  }
  const handleUpdateIssue = async () => {
    if (issue.desc.trim() === '') return;
  
    try {
      // Map over projectIssue array to update the issue with the same _id
      const updatedIssues = projectIssue?.map((iss) =>
        iss._id === issue._id
          ? { ...iss, desc: issue.desc, status: issue.status }
          : iss
      );
  
      // Send updated issue array to backend
      const { data } = await axios.put(
        `http://localhost:2000/project/${id}`,
        { projectIssue: updatedIssues },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Issue updated successfully:', data);
      setRefresh((e) => !e);  // Refresh the page or state
      setProjectIssue(data.projectIssue)
      setIssue({desc:'',status:''})

  
    } catch (error) {
      console.log('Error updating issue:', error);
    }
  };


    return(
    <div>
        <Navbar />
        <div className='flex'>

            <div className='shadow-lg flex flex-col justify-around gap-1 w-1/5 h-[500px] bg-black text-white text-xl '>
                 <div className='p-3 h-full text-center  text-lg bg-[#21573c] flex flex-col gap-3 items-center'>
                    {project?.title}
                   {(project?.creator === decode?.id )&& <a href={`/updateproject/${project?._id}`}  className=' border w-20 '>update</a>}
                    {/* <a href={`/updateproject/${project.id}`}><BorderColorIcon color='primary' /></a> */}

                  </div>
                 <button  onClick={()=>setDisplayControl(1)} className=' p-3 h-full bg-[#21573c]'>Discription</button>
                 <button onClick={()=>setDisplayControl(2)} className=' p-3 h-full bg-[#21573c]'>Tasks</button>
                 <button onClick={()=>setDisplayControl(3)} className=' p-3 h-full bg-[#21573c]'>Schedule</button>
                 <button onClick={()=>setDisplayControl(4)} className=' p-3 h-full bg-[#21573c]'>Issue</button>
                 <button onClick={()=>setDisplayControl(5)} className=' p-3 h-full bg-[#21573c]'>Teams</button>
            </div>

            <div  className={`w-4/5   overflow-x-scroll overflow-y-auto h-[500px] px-6 py-4  ${displayControl===2 && 'bg-[#448b68]'} `} style={{scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                 
                 {displayControl===1 && 
                    <div className='flex flex-col items-center px-[8%] py-8'>
                        <p className=' text-center text-2xl pb-3 font-semibold text-gray-600 '>{project?.title}</p>
                        <div className='flex justify-between w-full py-4 font-semibold'>
                            <p className='text-lg text-gray-600 '><span className='text-blue-500'>Start Date</span>: {project?.startDate?.slice(0, 10)}</p>
                            <p className='text-lg text-gray-600 '><span className='text-red-600'>Deadline</span> : {project?.deadline?.slice(0, 10)}</p>

                        </div>
                        <div className='flex justify-between  w-full pb-1'>
                            <p className='text-lg font-semibold text-green-700 '>Progress : {project?.status}%</p>
                            <p></p>
                        </div>  
                        <p className='text-lg text-gray-600'>
                          {project?.desc}
                        </p>
                    </div>
                 }
                 


                 {displayControl===2 && 

                 <div className='grid grid-cols-3 gap-x-4 gap-y-5   '>
                    <div className='border-b-2 pb-3 '> <a href={`/createtask/${project._id}`}className='text-lg text-white  font-bold' >Add new Task +</a></div>
                    <div className='border-b-2'></div>
                    <div className='border-b-2'></div>


                  {tasks?.map((item)=>(
                    <TaskCard 
                    key={item.key}
                    title={item.title}
                    desc={item.desc}
                    status={item.status}
                    startDate={item.startDate}
                    deadline={item.deadline}
                    teamMemeber={item.teamMembers}
                    images={item.taskImage}
                    taskId={item._id}

                     />
                  ))}



                 {/* <TaskCard
                     title='Graphics design' 
                     desc='Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, 
                     when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                     progress='20'
                     startDate='2/23/2021'
                     deadline='11/5/024'
                     teamMemeber='Mihlet2@gmail.com'
                     status='10'
                     images={img1}
                   
                   /> */}

                   

               
                  

                </div>
                }




                 {displayControl===3 && 
                   
                     
                     <div>
                          <h1 className='text-3xl font-semibold text-center pt-2 text-green-800 font-serif'>Schedules </h1>
                          <div>
                            <p className='text-xl pt-2 font-semibold text-gray-500'><EventAvailableIcon sx={{ color:'green' }} /> Here are the Current Schedules</p>
                              
                            <div className='flex flex-col gap-1 pt-3'>
                                  {project?.projectSchedule.map((item)=>(
                                    <div className='text-lg font-semibold text-gray-700' key={item.key}>
                                     - {item}
                                    </div>
                                    
                                  ))}
                            </div>
                          </div>
                    
                    </div>
                 
                 }

                 {displayControl===4 &&
                   
                   <div className='flex flex-col gap-3'>
                        <h1 className='text-2xl font-semibold font-serif text-green-700 pb-6'>This are Issues of the Projects</h1>
                        <button onClick={()=>{setAddIssueButton((e)=>!e),setIsUpdate(false),setIssue({desc:'',status:''})}} className='text-lg w-[100px] text-green-700 font-bold'>Add Issue +</button>  
                        
                        {(addIssueButton ) && <div className='flex flex-col gap-2 w-[500px]'>
                            <span className='text-lg text-gray-500 font-semibold' >Enter the Issue</span>
                            <textarea value={issue.desc} onChange={(e)=>setIssue({...issue,desc:e.target.value})} placeholder='The issue description...' className='border p-2 border-green-600 w-[450px] h-[120px] outline-none'/>
                            
                            <span className='text-lg text-gray-500 font-semibold'>Enter the Issue Status</span> 
                            <select value={issue.status} onChange={(e)=>setIssue({...issue,status:e.target.value})} className='border p-2 text-green-900 border-green-600 outline-none font-semibold w-[140px] py-2 px-2 flex justify-center'>
                              <option value=''>Select Status</option>
                              <option value='Issued'>Issued</option>
                              <option value='In-Progress'>In-Progress</option>
                              <option value='Solved'>Solved</option>
                              <option value='Difficult'>Difficult</option>


                            </select>
                            <button onClick={()=>isUpdate? handleUpdateIssue(): handleAddIssue()} className='bg-green-700 px-2 py-1 text-white text-lg'>Add</button>
                        </div>}


                       
                        <p className='text-2xl text-gray-700 pt-5 '>Here is the issue raise in this project</p> 
                          <div>
                                {projectIssue?.map((item,index)=>(
                                  <div className='flex flex-col justify-between w-[800px]  border-t-2 p-3 rounded-lg' key={item.key}>
                                     <p className='text-lg text-gray-600'>{index+1}. {item.desc}</p>
                                      <span className={`${item.status==='In-Progress' && 'text-blue-500' } ${item.status==='Solved' && 'text-green-500' } ${item.status==='Difficult' && 'text-red-500' } ${item.status==='Issued' && 'text-yellow-500' }  p-2 w-32 font-bold `}>{item.status}</span>
                                      <div className='flex gap-10 pt-7'>
                                         <button><DeleteIcon sx={{ color:'red' }} /></button>
                                         <button onClick={()=> handleUpdatIssueButton({item })}><EditIcon sx={{color:'blue'}}/> </button>
                                      </div>
                                    </div>
                                ))}
                          </div> 
                   
                    </div>
                  
                  }


                 {displayControl===5 && 

                    <div>
                          <h1 className='text-2xl font-semibold text-center pt-2 text-green-800 font-serif'>Team Member of this Project </h1>
                          <div>
                            <p className='text-xl pt-2 font-semibold text-gray-500'><Groups2Icon fontSize='large' sx={{ color:'green' }} /> Team Assigned</p>
                              
                            <div className='flex flex-col gap-1 pt-3'>
                                  {project?.teamMembers?.map((item)=>(
                                    <div className='text-lg font-semibold text-gray-700' key={item.key}>
                                     - {item}
                                    </div>
                                    
                                  ))}
                            </div>
                          </div>
                    
                    </div>                 
                 }

            </div>
        </div>
    </div>
    )
}

export default ProjectDetailPage