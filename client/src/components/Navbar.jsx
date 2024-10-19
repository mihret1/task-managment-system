import { useState } from "react"


const Navbar=()=>{
    const [colorChange,setColorChange]=useState(1)
    
    return(
    <div className="flex flex-col h-[150px] bg-black  text-white py-4 px-5 justify-between">
        <div className="flex justify-between">
            <a href="/" className="text-semibold text-xl pb-5"> Task Managment System </a>
            <div className="flex gap-3 items-center">
             
               <a href="/"className="flex justify-center items-center bg-green-800 font-semibold px-4 h-9 w-24 text-white text-lg">Create</a>
 
                <span className="text-xl">Mihiret Desalegn</span>
             
                <a href="/" className="flex justify-center items-center text-lg font-semibold bg-green-800 px-5 h-9 w-24 text-white">Signup</a>
                <span className="text-lg">notification</span>
            </div>
        </div>
       
        <div className="flex justify-center text-xl pt-3 ">
             <div className="flex gap-6">
                <a href='/' className={ `hover:text-green-500  text-white px-7 active:text-green-500 `}>All  </a>
                <a href='/created' className={`hover:text-green-500 px-7 text-white`}>Project You Created</a>
                <a href='/assigned' className={`hover:text-green-500  px-7 text-white `}>Projects you assigned</a>
             </div>
        </div>
    </div>
)
}

export default Navbar