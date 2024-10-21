
import { useState } from 'react'
import Navbar from '../components/Navbar'

const ProjectDetailPage=()=>{
    const [displayControl,setDisplayControl]=useState(1)
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
                        <p className=' text-center text-2xl pb-3 font-semibold '>Web Development</p>
                        <div className='flex justify-between w-full py-3 font-semibold'>
                            <p className='text-lg '><span className='text-blue-500'>Start Date</span>: 1/2/2018</p>
                            <p className='text-lg '><span className='text-red-600'>Deadline</span> : 1/2/2018</p>

                        </div>
                        <p className='text-lg'>
                        It is a long established fact that a reader will be distracted by the readable content of a
                         page when looking at its layout. The point of using Lorem Ipsum is that it has a
                          more-or-less normal distribution of letters, as opposed to using 
                          Content here, content here, making it look like readable English.
                           Many desktop publishing packages and web page editors now use Lorem 
                           Ipsum as their default model text, and a search for lorem ipsum will 
                           uncover many web sites still in their infancy. Various versions have evolved over the years, 
                        sometimes by accident, sometimes on purpose (injected humour and the like).
                        </p>
                    </div>
                 }
                 {displayControl===2 && <div>Task</div>}
                 {displayControl===3 && <div>schedule</div>}
                 {displayControl===4 && <div>issue</div>}
                 {displayControl===5 && <div>team</div>}

            </div>
        </div>
    </div>
    )
}

export default ProjectDetailPage