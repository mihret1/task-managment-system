import { useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar=()=>{
    const [colorChange,setColorChange]=useState(1)
    const [signedEmail,setSignedEmail]=useState('')
    const navigate=useNavigate()


    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){
            try{
                const decode= jwtDecode(token)
                if(decode){
                    setSignedEmail(decode.email)
    
                    console.log(decode)
    
                }
            }catch(error){
                console.log(error)
            }
            
        }

    },[])

   
    
    return(
    <div className="flex flex-col h-[150px] bg-black w-[100%]  text-white py-4 px-5 justify-between">
        <div className="flex justify-between max-sm:flex-col  max-sm:pb-2">
            <a href="/" className="text-semibold text-xl pb-5"> Task Managment System </a>
            <div className="flex gap-3 items-center">
               <a href="/createproject"className="flex justify-center items-center bg-[#194d33] font-semibold px-4 h-9 w-24 text-white text-lg">Create</a>
                <span className="text-xl">{signedEmail}</span>
                {/* <span className="text-lg"><NotificationsIcon /></span> */}

                <button onClick={()=>{
                    localStorage.removeItem('token')
                    navigate('/auth',{replace:true})
                }} className="flex justify-center items-center text-lg font-semibold bg-[#194d33] px-2 h-9 w-20 text-white">Logout</button>
            </div>
        </div>
       
        <div className="flex justify-center text-xl pt-3 ">
             <div className="flex gap-6">
                {/* <a href='/created' className={`hover:text-green-500 px-7 text-white`}>Project You Created</a> */}
                <a href='/' className={ `hover:text-green-500  text-white px-7 active:text-green-500 `}>All The Projects </a>
                {/* <a href='/assigned' className={`hover:text-green-500  px-7 text-white `}>Projects you assigned</a> */}
             </div>
        </div>
    </div>
)
}

export default Navbar