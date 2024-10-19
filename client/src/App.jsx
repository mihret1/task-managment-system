import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Created from './pages/Created'
import Assigned from './pages/Assigned'
import CreateProjects from './pages/createProjects'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";



export default function App() {

  const AppWrapper=({children})=>{
    const navigate=useNavigate()
    
    useEffect(()=>{
      const token=localStorage.getItem('token')
      if(token){
        try{
          const decode=jwtDecode(token)
          const currentTime=Date.now()/1000
          if(decode.exp <currentTime){
            localStorage.removeItem('token')
            navigate('/auth',{replace:true})
          }
        }catch(error){
          console.log(error)
          localStorage.removeItem('token')
          navigate('/auth',{replace:true})

        }

      }else if(!token){
        navigate('/auth',{replace:true})

      }
        
    },[navigate])
    return(<>{children}</>)

  }

  return (
  
    <BrowserRouter >
       {/* <Navbar /> */}
       <AppWrapper>
       <Routes>
         <Route   exact={true} path='/' element={<Home />}/>
         <Route   path='/auth' element={<Auth />}/>
         <Route   path='/created' element={<Created />}/>
         <Route   path='/assigned' element={<Assigned />}/>
         <Route   path='/createproject' element={<CreateProjects />}/>

       </Routes>
       </AppWrapper>
    </BrowserRouter>
    
  )
}