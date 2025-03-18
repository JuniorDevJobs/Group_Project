import './App.css'
import NavigationBar from './components/NavigationBar'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from "./pages/SignUpPage"
import HomePage from './pages/HomePage'
import JobSearch from './pages/JobSearch'
function App() {

  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element= {<HomePage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element = {<SignUpPage />} />
          <Route path="/JobSearch" element={<JobSearch />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
