import './App.css'
import NavigationBar from './components/NavigationBar'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from "./pages/SignUpPage"
import HomePage from './pages/HomePage'
import JobSearch from './pages/JobSearch'
import ResourcesPage from './pages/ResourcesPage'
import { UserProvider } from './context/UserContext'
import Profile from './pages/ProfilePage'
import AboutUs from './pages/AboutUs'
function App() {

  return (
    <>
      <BrowserRouter>
      <UserProvider >
        <NavigationBar />
        <Routes>
          <Route path="/" element= {<HomePage />} />
          <Route path="/home" element= {<HomePage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element = {<SignUpPage />} />
          <Route path="/JobSearch" element={<JobSearch />} />
          <Route path="/Resources" element={<ResourcesPage />} />
          <Route path="/AboutUs" element ={<AboutUs />} />
        </Routes>
      </ UserProvider >
      </BrowserRouter>
    </>
  )
}

export default App
