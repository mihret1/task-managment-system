
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import img1 from '../assets/p1.png'
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const ProjectDetailPage=()=>{
    const [displayControl,setDisplayControl]=useState(1)
    const [project,setProject]=useState(null)
    const { id }=useParams()

    

      const TaskCard=(props)=>{
       
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
                    <span className='text-gray-500 text-lg font-semibold'>{props.title}</span>
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
                             <span><button className='text-red-500 border-b-2 pb-2' onClick={()=>{}}>Delete</button></span>
                             <span><a href='/' className='text-blue-500'>Edit</a></span>
                        </div>
                    </Popover>
              </div>
              <div 
                style={{
                    scrollbarWidth: 'none', /* For Firefox */
                    msOverflowStyle: 'none', /* For IE and Edge */
                }}
              className='flex flex-col  gap-2  h-[440px]  overflow-y-scroll'>

                  <div className='h-[240px] bg-white rounded-lg shadow-md'>
                    <div className='h-12 bg-gray-500 rounded-t-lg'>
                    </div>
                    <p className='px-3 pt-1 font-semibold text-green-600'>Progress : {props.status}%</p>
                    <p className='px-3 py-2 text-gray-700'>{props.desc?.slice(0,180)}</p>
                  </div>
                
                   <div className='flex justify-between bg-white rounded-lg shadow-lg px-3 py-2 '>
                     <div className='flex flex-col '>
                        <span className='text-blue-400 font-semibold'>Start date</span>
                        <span className=' text-gray-500 font-semibold'>{props.startDate}</span>
                    </div>
                     <div className='flex flex-col '>
                        <span className='text-red-400 font-semibold'>Deadline</span>
                        <span className='text-gray-500 font-semibold'>{props.startDate}</span>
                     </div>
                   </div>

                   <div className='flex flex-col gap-1 rounded-lg bg-white px-3 py-2 text-gray-700 shadow-lg' >
                    <span className='text-lg text-gray-600 font-semibold border-b pb-1'>Team Members</span>
                    <span>{props.teamMemeber}</span>
                    <span>{props.teamMemeber}</span>
                    <span>{props.teamMemeber}</span>
                    <span>{props.teamMemeber}</span>

                   </div>

                   <div>
                    <img className='' src={props.images}/>
                   </div>
              </div>

            </div>
        )
      }
    
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

            <div className='w-3/4 px-[5%] py-8 '>
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
                 <div className='grid grid-col-3'>
                    <TaskCard
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
                   
                   />
                </div>
                }




                 {displayControl===3 && <div>schedule</div>}
                 {displayControl===4 && <div>issue</div>}
                 {displayControl===5 && <div>team</div>}

            </div>
        </div>
    </div>
    )
}

export default ProjectDetailPage