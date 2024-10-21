
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const ProjectDetailPage=()=>{
    const [displayControl,setDisplayControl]=useState(1)
    const [project,setProject]=useState(null)
    const { id }=useParams()

      const TaskCard=()=>{}
    
    useEffect(()=>{
       const projectDetail=async()=>{
            try{
               const {data}= await axios.get(`http://localhost:2000/project/${id}`)
                 setProject(data)
            }catch(error){
                console.log(error)
            }
       }
       projectDetail()
    },[id])
    
    return(
    <div>
        <Navbar />
        <div className='flex'>
            <div className='flex flex-col justify-around gap-1 w-1/4 h-[500px] bg-black text-white text-xl '>
                 <button  onClick={()=>setDisplayControl(1)} className=' p-3 h-full bg-[#194d33]'>Discription</button>
                 <button onClick={()=>setDisplayControl(2)} className=' p-3 h-full bg-[#194d33]'>Tasks</button>
                 <button onClick={()=>setDisplayControl(3)} className=' p-3 h-full bg-[#194d33]'>Schedule</button>
                 <button onClick={()=>setDisplayControl(4)} className=' p-3 h-full bg-[#194d33]'>Issue</button>
                 <button onClick={()=>setDisplayControl(5)} className=' p-3 h-full bg-[#194d33]'>Teams</button>
            </div>
            <div className='w-3/4 px-[5%] py-8'>
                 {displayControl===1 && 
                    <div className='flex flex-col items-center'>
                        <p className=' text-center text-2xl pb-3 font-semibold '>{project?.title}</p>
                        <div className='flex justify-between w-full py-4 font-semibold'>
                            <p className='text-lg '><span className='text-blue-500'>Start Date</span>: {project?.startDate?.slice(0, 10)}</p>
                            <p className='text-lg '><span className='text-red-600'>Deadline</span> : {project?.deadline?.slice(0, 10)}</p>

                        </div>
                        <div className='flex justify-between  w-full pb-1'>
                            <p className='text-lg font-semibold text-green-700 '>Progress : {project?.status}%</p>
                            <p></p>
                        </div>  
                        <p className='text-lg'>
                          {project?.desc}
                        </p>
                    </div>
                 }
                 {displayControl===2 && 
                 <div>
                    Task
                </div>}
                 {displayControl===3 && <div>schedule</div>}
                 {displayControl===4 && <div>issue</div>}
                 {displayControl===5 && <div>team</div>}

            </div>
        </div>
    </div>
    )
}

export default ProjectDetailPage