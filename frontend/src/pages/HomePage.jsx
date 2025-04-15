import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import Profile from './ProfilePage';
import { Dialog, DialogContent, Typography } from '@mui/material';

export default function Homepage() {
    const { loggedIn } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handleChange);

        return () => darkModeQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: isDarkMode ? '#1e1e1e' : '#f9f9f9',
            color: isDarkMode ? '#ffffff' : '#222',
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            {/* Hero Section */}
            <header style={{
                textAlign: 'center',
                marginBottom: '50px',
                backgroundColor: isDarkMode ? '#333' : '#e0f7fa',
                padding: '50px 20px',
                borderRadius: '15px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{
                    fontSize: '3em',
                    marginBottom: '10px',
                }}>Junior Dev Jobs</h1>
                <p style={{ fontSize: '1.5em', maxWidth: '800px', margin: '0 auto' }}>
                    Your one-stop platform to search for developer job posts from multiple websites!
                </p>
            </header>

            {/* Text + Image Section */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '30px',
                marginBottom: '60px',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                <Typography sx={{ maxWidth: 500, fontSize: '1.2em' }}>
                    Tired of looking at multiple sites to locate job opportunities? <br /><br />
                    <strong>Junior DevJobs</strong> solves this by consolidating all your searches into one location, reducing the need to perform redundant searches!
                </Typography>
                <img
                    src="https://cvviz.com/wp-content/uploads/2020/09/paid-and-free-job-postings-sites.png"
                    alt="Job Posting Sites"
                    style={{ width: "575px",height:"400px", objectFit: "contain", borderRadius: '2px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                />
            </div>

            {/* How it Works Section */}
            <section style={{
                backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                marginBottom: '40px',
            }}>
                <h2 style={{
                    fontSize: '1.8em',
                    marginBottom: '15px'
                }}>🚀 How It Works</h2>

                <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
                    We aggregate job posts from top job boards like <strong>Indeed</strong> and <strong>FindWork</strong>, all in one place. Search for developer jobs based on location and get results from multiple sources — making it easier to find the perfect job that fits your needs.
                </p>

                {/* Buttons */}
                <div style={{ marginTop: '25px' }}>
                    <button
                        onClick={() => window.location.href = '/Jobsearch'}
                        style={styles.button}
                    >
                        🔍 Start Searching
                    </button>

                    {loggedIn && (
                        <button
                            onClick={handleOpen}
                            style={{ ...styles.button, backgroundColor: '#369f8b' }}
                        >
                            👤 Manage Profile
                        </button>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                textAlign: 'center',
                padding: '20px 0',
                borderTop: `1px solid ${isDarkMode ? '#444' : '#ccc'}`,
                fontSize: '0.9em',
                color: isDarkMode ? '#aaaaaa' : '#777',
                marginTop: '60px'
            }}>
                <p>© 2025 Junior Dev Jobs. All rights reserved.</p>
            </footer>

            {/* Profile Modal */}
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
                <DialogContent sx={{ background: isDarkMode ? "#a8a8a8" : "#f0f0f0", color: isDarkMode ? "#ffffff" : "#000000" }}>
                    <Profile />
                </DialogContent>
            </Dialog>
        </div>
    );
}

const styles = {
    button: {
        backgroundColor: '#44BBA4',
        color: '#fff',
        padding: '12px 24px',
        fontSize: '1em',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginRight: '15px',
        transition: 'background-color 0.3s',
    }
};