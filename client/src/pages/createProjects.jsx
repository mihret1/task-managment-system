
import React, { useState } from 'react'
import FileBase from 'react-file-base64';
import Navbar from '../components/Navbar';

function CreateProjects() {
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [projectImage,setProjectImage]=useState("")
    const [deadline,setDeadline]=useState("")
    const [status,setStatus]=useState('')
    const [ teamMembers,setTeamMembers]=useState([])
  return (
    <div>
        <Navbar />
        <div>
            <p className=''>Create Project</p>
            <form>
                <input  type='text' />
            </form>
        </div>
       
    </div>
  )
}

export default CreateProjects