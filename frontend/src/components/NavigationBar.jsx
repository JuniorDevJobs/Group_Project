import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import WorkIcon from '@mui/icons-material/Work';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const pages = ['Profile','Job Search', 'Resources'];

function NavigationBar() {
    const {loggedIn, setLoggedIn} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLoginLogout = () => {
        if (loggedIn) {
            setLoggedIn(false);
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("jobs")
            localStorage.removeItem("username")
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    const handleNavigate = (path) => {
        navigate(path); // Navigate directly to the given path
    };

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                backgroundColor: '#6a4c9c', // Dark Lavender
                borderRadius: '10px', // Rounded corners
                overflow: 'hidden' // Prevents clipping of rounded corners
            }}
        >
            <Container maxWidth="false">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    {/* Logo and Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: -2 }}>
                        <WorkIcon sx={{ mr: 1 }} />
                        <Typography
                            variant="h6"
                            component="a"
                            onClick={() => handleNavigate('/')} // Navigate directly to home page
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1,
                                cursor: 'pointer', // Ensure it's clickable
                            }}
                        >
                            JuniorDevJobs
                        </Typography>
                    </Box>

                    {/* Navigation Links */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {pages.map((page) => (
                            <Button
                                onClick={() => handleNavigate(`/${page.split(" ").join("")}`)} // Navigate based on page
                                key={page}
                                sx={{ color: 'white' }}
                            >
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