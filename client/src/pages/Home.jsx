import React, { useEffect, useState } from 'react'

import img1 from '../assets/p1.png'
import img2 from '../assets/p4.jpg'
import img3 from '../assets/ke.jpg'
import img4 from '../assets/new.jpg'
import img5 from '../assets/img1.jpg'
import img6 from '../assets/img2.jpg'
import Navbar from '../components/Navbar'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { jwtDecode } from 'jwt-decode'


function Home() {
  const [projects,setProject]=useState([])
  const [refresh, setRefresh] = useState(false);
  const token=localStorage.getItem('token')
  const decode=jwtDecode(token)

  useEffect(()=>{
    const getAllProjectss=async()=>{
      try{
        const {data}=await axios.get('http://localhost:2000/project/')
        setProject(data)
        // console.log(data)
       }catch(error){
        console.log(error)
       }
      }
    getAllProjectss()
       
  },[refresh])


  const handleDelete=async(_id)=>{
      const token=localStorage.getItem('token') 
      const {data}=await axios.delete(`http://localhost:2000/project/${_id}`
        ,{headers:{Authorization:`Bearer ${token}`}}
      )
      setRefresh(!refresh)
      console.log(data)
    
  }

  const CardOne=(props)=>{
    return(
      <div className=' w-[400px] shadow-lg flex flex-col rounded-lg '>
            
           <a href={`/projectdetail/${props.idd}`} className='w-full'><img src={props.imgg} className='w-full rounded-t-xl h-[220px]'/></a>
           <div className='flex flex-col gap-4  p-5' >
              <p className='text-center text-xl font-semibold'>{props.title}</p>
              <p className='font-sans text-gray-600'>{props.desc?.slice(0, 190)}</p>
              <div className='flex justify-between'> 
                  <p className=' font-semibold text-gray-700'>Progress: {props.progress}%</p>
                  <p className='font-semibold text-gray-700'>Deadline: {props.deadline && props.deadline.slice(0, 10)}</p>
              </div>
              
             {(props.creator === decode.id) &&  <div className='flex justify-between '>
                <button onClick={()=>handleDelete(props.idd)} className='px-2  z-10'>
                  <DeleteIcon sx={{color:'red',width:'100%'}}/> 
                </button>
                <a href={`/updateproject/${props.idd}`}><BorderColorIcon color='primary' /></a>
              </div>}
           </div>
      </div>
    )
  }



  return (
    <div>
       <Navbar />


      <div className='grid grid-cols-3 max-md:grid-cols-1 md:max-lg:grid-cols-2  gap-x-4 gap-y-16 px-10 py-4'>
           {projects.map((item)=>(
             <CardOne 
             key={item.key} 
             imgg={item.projectImage}
             title={item.title}
             desc={item.desc}
             progress={item.status}
             deadline={item.deadline}
             idd={item._id}
             creator={item.creator}
             />
           ))}

          <CardOne  imgg={img1}
              title='Guzo Mobile App'
               desc='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s,'
               progress='30'
               deadline='4/23/2024'
               />
          <CardOne  imgg={img4}
              title='Guzo Mobile App'
               desc='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s,'
               progress='30'
               deadline='4/23/2024'/>
           <CardOne  imgg={img3}
               title='Guzo Mobile App'
                desc='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s,'
                progress='30'
                deadline='4/23/2024'/>
           <CardOne  imgg={img2}
              title='Guzo Mobile App'
               desc='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s,'
               progress='30'
               deadline='4/23/2024'/>
            <CardOne  imgg={img5}
              title='Guzo Mobile App'
               desc='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s,'
               progress='30'
               deadline='4/23/2024'/>
             <CardOne  imgg={img6}
              title='Guzo Mobile App'
               desc='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s,'
               progress='30'
               deadline='4/23/2024'/>             

    </div>
    </div>
    
  )
}

export default Home