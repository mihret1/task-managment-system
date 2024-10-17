import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Created from './pages/Created'
import Assigned from './pages/Assigned'

export default function App() {
  return (
    <BrowserRouter >
       <Navbar />
       <Routes>
         <Route  exact={true} path='/' element={<Home />}/>
         <Route   path='/created' element={<Created />}/>
         <Route   path='/assigned' element={<Assigned />}/>

       </Routes>
    </BrowserRouter>
  )
}