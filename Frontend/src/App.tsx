import './App.css'
import { Dashboard } from './pages/Dashboard'
import { ShareDashboard } from './pages/ShareDashboard'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  return(
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<SignUp/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='share/:shareLink' element={<ShareDashboard/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
