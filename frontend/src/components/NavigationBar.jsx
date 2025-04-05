import React, { useContext } from 'react';
import {
    AppBar, Box, Toolbar, Typography, Container,
    Button, Tooltip, IconButton
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const pages = ['Job Search', 'Resources', "About Us"];

function NavigationBar() {
    const { loggedIn, setLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLoginLogout = () => {
        if (loggedIn) {
            setLoggedIn(false);
            localStorage.clear();
            localStorage.removeItem("storedJobs");
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <AppBar 
            position="fixed"
            elevation={4}
            sx={{ 
                background: 'linear-gradient(90deg, #6a4c9c 0%, #957DAD 100%)',
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
                opacity: 0.95
            }}
        >
            <Container maxWidth="false">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Logo and Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleNavigate('/')}>
                        <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
                            <WorkIcon />
                        </IconButton>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: '.15rem',
                                fontFamily: 'Segoe UI, sans-serif',
                                color: 'white',
                                userSelect: 'none'
                            }}
                        >
                            JuniorDevJobs
                        </Typography>
                    </Box>

                    {/* Navigation Buttons */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleNavigate(`/${page.replace(/\s+/g, '')}`)}
                                sx={{
                                    color: 'white',
                                    fontWeight: 600,
                                    transition: 'transform 0.2s, background 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        transform: 'scale(1.05)'
                                    }
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                        <Tooltip title={loggedIn ? "Sign out of your account" : "Log into your account"}>
                            <Button
                                onClick={handleLoginLogout}
                                sx={{
                                    color: '#fff',
                                    fontWeight: 600,
                                    border: '1px solid white',
                                    borderRadius: '20px',
                                    paddingX: 2,
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        color: '#6a4c9c'
                                    }
                                }}
                            >
                                {loggedIn ? 'Log Out' : 'Login'}
                            </Button>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavigationBar;