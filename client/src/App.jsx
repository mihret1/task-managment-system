import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Created from './pages/Created'
import Assigned from './pages/Assigned'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function App() {

  // const AppWrapper=({children})=>{
  //   const navigate=useNavigate()
  //   useEffect(()=>{},[])
  //   return(<>{children}</>)

  // }
  return (
    <BrowserRouter >
       {/* <Navbar /> */}
       <Routes>
         <Route   exact={true} path='/' element={<Home />}/>
         <Route   path='/auth' element={<Auth />}/>
         <Route   path='/created' element={<Created />}/>
         <Route   path='/assigned' element={<Assigned />}/>
         
       </Routes>
    </BrowserRouter>
  )
}