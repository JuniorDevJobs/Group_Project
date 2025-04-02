import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import Profile from './ProfilePage';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
export default function Homepage() {
    const {loggedIn} = useContext(UserContext)
    const [ isOpen, setIsOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)



    useEffect(() => {
            // Detect system preference for dark mode
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setIsDarkMode(darkModeQuery.matches);
    
            const handleChange = (e) => setIsDarkMode(e.matches);
            darkModeQuery.addEventListener('change', handleChange);
    
            return () => darkModeQuery.removeEventListener('change', handleChange);
        }, []);

    return (
        <div style={
            {
                fontFamily: 'Impact',
                backgroundColor: isDarkMode ? '#333333' : '#f4f4f4',
                color: isDarkMode ? '#ffffff' : '#000000',
                padding: '20px',
                maxWidth: '1200px',
                margin: '0 auto',
            }
        }>
            <header style={{
                    textAlign: 'center',
                    marginBottom: '40px',
                }}>

                <h1 style={
                    {
                        fontSize: '3em',
                        // color: isDarkMode ? '#ffffff' : '#555',
                    }
                }>Junior Dev Jobs</h1>

                <p style={
                    {
                        fontSize: '1.5em',
                    }
                }>Your one-stop platform to search for developer job posts from multiple websites!</p>
            </header>

            <section style={{marginBottom: '40px',}}>
                <h2 style={{
                    fontSize: '1.3em',
                    marginBottom: '10px',
                }}>How It Works</h2>

                <p style={{
                    fontSize: '1.2em',
                    lineHeight: '1.6',
                }}>
                    Job search aggregates job posts from top job boards like Indeed and FindWork, all in one place. 
                    You can search for developer jobs based on location and get results from multiple sources, 
                    making it easier to find the perfect job that fits your needs.
                </p>
                <button
                    onClick={() => window.location.href = '/Jobsearch'}
                    style={{
                        backgroundColor: '#44BBA4',
                        color: '#fff',
                        padding: '10px 20px',
                        fontSize: '1.2em',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                        margin: "10px"
                    }}
                >
                    Start Searching
                </button>
                {loggedIn && (
                <button 
                onClick={handleOpen}
                style={{
                    backgroundColor: "#44BBA4",
                    color: "#fff",
                    padding: '10px 20px',
                    fontSize: '1.2em',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    margin: "10px"
                }}> Manage Profile </button>
                )}
            </section>

          

            <footer style={{
            textAlign: 'center',
            marginTop: '40px',
            fontSize: '0.9em',
            color: isDarkMode ? '#aaaaaa' : '#777',
            }}>
                <p>© 2025 Job Finder. All rights reserved.</p>
            </footer>

            <Dialog 
                open={isOpen} 
                onClose={handleClose} 
                fullWidth maxWidth="md"
                >
                <DialogContent sx={{ background: isDarkMode ? "#a8a8a8" : "#d8d8d8", color: isDarkMode ? "#ffffff" : "#000000" }}>
                    <Profile />
                </DialogContent>
            </Dialog>
        </div>
    );
}

const styles = {
    
    subtitle: {
        fontSize: '1.2em',
        color: '#555',
    },
    descriptionSection: {
        marginBottom: '40px',
    },
    sectionTitle: {
        fontSize: '2em',
        color: '#333',
        marginBottom: '10px',
    },
    description: {
        fontSize: '1.1em',
        lineHeight: '1.6',
        color: '#555',
    },
    searchSection: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '40px',
    },
    searchDescription: {
        fontSize: '1.1em',
        marginBottom: '20px',
        color: '#555',
    },
    searchButton: {
        backgroundColor: '#44BBA4',
        color: '#fff',
        padding: '10px 20px',
        fontSize: '1.2em',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },

    searchButtonHover: {
        backgroundColor: '#369f8b',
    },
    profileButton :{
        backgroundColor : "#369f8b",
        color: "#fff",
        padding: '10px 20px',
        fontSize: '1.2em',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    },

    footer: {
        textAlign: 'center',
        marginTop: '40px',
        fontSize: '0.9em',
        color: '#777',
    },
};