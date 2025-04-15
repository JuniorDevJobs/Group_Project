import { useState, useEffect, useContext } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import Results from "../components/JobResultsComponent";
import { fetchJobs } from "../api/jobs";
import UserContext from "../context/UserContext"
import { Search, LocationOn } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle} from '@mui/material';

export default function JobSearch() {
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [errorMessage, setErrorMessage]=useState("")
    const token = localStorage.getItem("access")
    const {setSavedJobs, savedJobs, fetchSavedJobs } = useContext(UserContext)
    

    const [results, setResults] = useState(() => {
        try {
            const storedJobs = localStorage.getItem("storedJobs");
            return storedJobs ? JSON.parse(storedJobs) : [];
        } catch (error) {
            console.error("Error parsing stored jobs:", error);
            return []; // Fallback to empty array
        }
    });

    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem("userData");
        return storedUserData ? JSON.parse(storedUserData) : null;
    });

    
    // if (results) {
        
    //     console.log("Results", results)
    // } else {
    //     console.log("NOT RESULTS")}
    
    useEffect(() => {
        async function loadJobs() {
            try {
                const fetchedJobs = await fetchSavedJobs(token);
                localStorage.setItem("storedJobs", JSON.stringify(fetchedJobs));
                setResults(fetchedJobs);
            } catch (error) {
                console.error("Error fetching saved jobs:", error);
                setResults([]); // Ensure results is always an array
            }
        }
    
        if (!localStorage.getItem("storedJobs")) {
            loadJobs();
        }
    }, [token, fetchSavedJobs]);
    

    useEffect(() => {
        // Detect system preference for dark mode
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handleChange);

        // Set saved jobs from user data if available
        if (userData && userData.saved_jobs) {
            setSavedJobs(userData.saved_jobs);
        }

        return () => darkModeQuery.removeEventListener('change', handleChange);
    }, [userData, setSavedJobs]);


    const handleJobSearch = async (e) => {
        e.preventDefault();
        const context = {
            "location": location, 
            "title": title,
            "userPreferences": userData?.preferences || {}
        };
        try {
            const searchResults = await fetchJobs(context, token);
            setErrorMessage("")
            if (searchResults.jobs) {
                if (searchResults.jobs.length === 0) {
                    setErrorMessage("No results for this search. Ensure you entered your location in the correct format. Use a US state abreviation, Counrty, or Remote")
                    
                } else {
                    localStorage.setItem("storedJobs", JSON.stringify(searchResults.jobs));
                    setResults(searchResults.jobs);
                }
                
            } else if (searchResults.cached_jobs) {
                localStorage.setItem("storedJobs", JSON.stringify(searchResults.cached_jobs));
                
                setResults(searchResults.cached_jobs);
            } else {
                // add alert message 
                setResults([]);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setResults([]);
        }
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    return (
        <div 
            className="page-container"
            style={{ 
                minWidth: "800px",
                maxWidth: "800px",
                width: "100%",
                margin: "0 auto",
                paddingTop: "20px",
                minHeight: "100vh",
                padding: "20px",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                background: isDarkMode 
                    ? "linear-gradient(to bottom right, #1a1a1a, #2c2c2c)" 
                    : "linear-gradient(to bottom right, #ffffff, #f0f0f0)",
                color: isDarkMode ? "#ffffff" : "#000000"
            }}
        >
            <h2 
                style={{ 
                    textAlign: "center", 
                    color: "#44BBA4", 
                    fontFamily: "'Impact', sans-serif", 
                    letterSpacing: "1px",
                    fontSize: "2.5rem",
                    marginBottom: "10px",
                    textShadow: isDarkMode ? "1px 1px #000" : "1px 1px #ccc"
                }}
            >
                💼 Job Search
            </h2>
            {userData && (
                <div style={{ 
                    textAlign: "center", 
                    marginBottom: "20px",
                    color: isDarkMode ? "#ffffff" : "#000000"
                }}>
            <Typography 
                sx={{
                    fontFamily: "'Courier New', monospace",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: isDarkMode ? "#A2FFD8" : "#222",
                    mb: 2,
                    textAlign: "center"
                }}
            >
                👋 Welcome, {userData.username}!
            </Typography>
                </div>
            )}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    backgroundColor: isDarkMode ? "#2e2e2e" : "#ffffff",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: isDarkMode 
                        ? "0px 4px 12px rgba(100, 255, 218, 0.15)" 
                        : "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    marginBottom: "30px"
                }}
            >
                <TextField
                    required
                    id="location"
                    label="Location"
                    name="location"
                    placeholder="e.g. Remote, FL or Ca"
                    value={location}
                    onChange={handleLocationChange}
                    helperText="Enter Abreviated State, Country or 'Remote'"
                    fullWidth
                    sx={{
                        "& .MuiInputBase-root": {
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#fafafa",
                            borderRadius: "6px"
                        },
                        "& label": {
                            color: isDarkMode ? "#bbb" : "#555"
                        },
                        "& .MuiFormHelperText-root": {
                            color: isDarkMode ? "#ddd" : "#444"
                        }
                    }}
                />

                <TextField
                    id="title"
                    label="Job Title"
                    name="title"
                    placeholder="Frontend, Backend, etc."
                    value={title}
                    onChange={handleTitleChange}
                    helperText="Optional, defaults to developer"
                    fullWidth
                    sx={{
                        "& .MuiInputBase-root": {
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#fafafa",
                            borderRadius: "6px"
                        },
                        "& label": {
                            color: isDarkMode ? "#bbb" : "#555"
                        },
                        "& .MuiFormHelperText-root": {
                            color: isDarkMode ? "#ddd" : "#444"
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: isDarkMode ? "#00C9A7" : "#44BBA4",
                        color: "#fff",
                        paddingX: "20px",
                        paddingY: "10px",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        alignSelf: "center",
                        "&:hover": {
                            backgroundColor: isDarkMode ? "#00E5B0" : "#3da693"
                        }
                    }}
                    onClick={handleJobSearch}
                >
                    🔍 Search Jobs
                </Button>
            </Box>

            <div 
                style={{ 
                    marginTop: "20px", 
                    borderRadius: "10px", 
                    backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff", 
                    padding: "15px",
                    boxShadow: isDarkMode 
                        ? "0px 4px 8px rgba(255, 255, 255, 0.1)" 
                        : "0px 4px 8px rgba(0, 0, 0, 0.05)"
                }}
            >
            {errorMessage ? (
                <Alert severity="error">{errorMessage}</Alert>
            ) : (
            <Results results={Array.isArray(results) && results.length > 0 ? results : (Array.isArray(savedJobs) ? savedJobs : [])} />
            )}
            </div>
        </div>
    );
}