import React from 'react'

import img1 from '../assets/p1.png'
import img2 from '../assets/p4.jpg'
import img3 from '../assets/ke.jpg'
import img4 from '../assets/new.jpg'
import img5 from '../assets/img1.jpg'
import img6 from '../assets/img2.jpg'
import Navbar from '../components/Navbar'

function Home() {
  const CardOne=(props)=>{
    return(
      <a href='/' className=' w-[400px] shadow-lg flex flex-col '>
           <img src={props.imgg} className='w-full h-[220px]'/>
           <div className='flex flex-col gap-2  p-5' >
              <p className='text-center text-xl font-semibold'>{props.title}</p>
              <p className='font-sans'>{props.desc}</p>
              <div className='flex justify-between'> 
                  <p className=' font-semibold text-gray-700'>Progress: {props.progress}%</p>
                  <p className='font-semibold text-gray-700'>Deadline: {props.deadline}</p>
              </div>
           </div>
      </a>
    )
  }
  return (
    <div>
       <Navbar />

      <div className='grid grid-cols-3 gap-x-4 gap-y-16 px-10 py-4'>
          <CardOne  imgg={img1}
              title='Guzo Mobile App'
               desc='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s,'
               progress='30'
               deadline='4/23/2024'/>
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