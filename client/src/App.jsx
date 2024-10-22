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
import UpdateProjects from './pages/updateProjects'
import ProjectDetailPage from './pages/ProjectDetail'
import CreateTask from './pages/createTask'



export default function App() {

  const AppWrapper=({children})=>{
    const navigate=useNavigate()
    const token=localStorage.getItem('token')

    useEffect(()=>{
      if(token){
        try{
          const decode=jwtDecode(token)
          if(decode){
            const currentTime=Date.now()/1000
            if(decode.exp <currentTime){
              localStorage.removeItem('token')
              navigate('/auth',{replace:true})
            }
          }
          
         }catch(error){
          console.log(error)
          localStorage.removeItem('token')
          navigate('/auth',{replace:true})

        }

      }else if(!token){
        navigate('/auth',{replace:true})

      }
        
    },[navigate,token])
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
         <Route   path='/updateproject/:id' element={<UpdateProjects />}/>
         <Route   path='/projectdetail/:id' element={<ProjectDetailPage />}/>
         <Route   path='/createtask/:id' element={<CreateTask />}/>

        

       </Routes>
       </AppWrapper>
    </BrowserRouter>
    
  )
}