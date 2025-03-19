import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import WorkIcon from '@mui/icons-material/Work';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const pages = ['Job Search', 'Interview Prep', 'Internship', 'Resources'];


function NavigationBar() {
    const [loggedIn, setLoggedIn] = useState(false); 
    // move loggedIn state to context in future
    const navigate = useNavigate()

    const handleLoginLogout = () => {
        if (loggedIn) {
            setLoggedIn(false)
            navigate("/")
        }else{
            navigate("/login")
            setLoggedIn(true)
        }
        }
    const handleNavigate = (e) => {
        console.log(e.target)
        navigate(`./${e.target.value}`)
    }
    


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          {/* Logo and Title */}
          <WorkIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component="a"
            value="home"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            JuniorDevJobs
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {pages.map((page) => (
              <Button onClick={handleNavigate} value={page.split(" ").join("")} key={page} sx={{ color: 'white' }}>
                {page}
              </Button>
            ))}

            <Button 
              onClick={handleLoginLogout}
              sx={{ color: 'white' }}
            >
              {loggedIn ? 'Log Out' : 'Login'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );

}
export default NavigationBar;