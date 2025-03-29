import { useState, useEffect, useContext } from "react";
import { TextField, Button, Box } from "@mui/material";
import Results from "../components/JobResultsComponent";
import { fetchJobs } from "../api/jobs";
import UserContext from "../context/UserContext"

export default function JobSearch() {
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    
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

    
    if (results) {
        
        console.log("Results", results)
    } else {console.log("NOT RESULTS")}
    
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
    
    // Log results *after* it's updated
    // useEffect(() => {
    //     console.log("Updated Results:", results);
    // }, [results]);


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
            if (searchResults.jobs) {
                localStorage.setItem("storedJobs", JSON.stringify(searchResults.jobs));
                setResults(searchResults.jobs);
                
            } else if (searchResults.cached_jobs) {
                localStorage.setItem("storedJobs", JSON.stringify(searchResults.cached_jobs));
                
                setResults(searchResults.cached_jobs);
            } else {
                console.log(searchResults)
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
                minWidth:"800px",
                maxWidth: "800px",  // Prevents growing beyond this width
                width: "100%",  // Ensures it is responsive but constrained
                margin: "0 auto",
                paddingTop: "20px",
                backgroundColor: isDarkMode ? "#121212" : "#f4f4f4", 
                color: isDarkMode ? "#ffffff" : "#000000", 
                minHeight: "100vh",
                padding: "20px"
            }}
        >
            <h2 style={{ textAlign: "center", color: "#44BBA4" }}>Job Search</h2>
            {userData && (
                <div style={{ 
                    textAlign: "center", 
                    marginBottom: "20px",
                    color: isDarkMode ? "#ffffff" : "#000000"
                }}>
                    Welcome, {userData.username}!
                </div>
            )}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center", 
                    gap: 2, 
                    justifyContent: "center",
                    backgroundColor: isDarkMode ? "#1E1E1E" : "#ffffff",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: isDarkMode 
                        ? "0px 4px 10px rgba(0, 255, 242, 0.3)" 
                        : "0px 4px 10px rgba(0, 0, 0, 0.1)"
                }}
            >
                <TextField
                    required
                    id="location"
                    label="Location"
                    name="location"
                    placeholder="Job Location"
                    value={location}
                    onChange={handleLocationChange}
                    helperText="Enter City, State Abbreviation, or Remote"
                    fullWidth
                    sx={{ 
                        maxWidth: 400,
                        input: { 
                            color: isDarkMode ? "#ffffff" : "#000000",
                        },
                        label: { 
                            color: isDarkMode ? "#bbbbbb" : "#555555" 
                        },
                        fieldset: { 
                            borderColor: isDarkMode ? "##00897B" : "#ccc" 
                        },
                        "& .MuiInputBase-root": {
                            backgroundColor: isDarkMode ? "#333333" : "#ffffff"
                        }
                    }} 
                />
                <TextField
                    required
                    id="title"
                    label="title"
                    name="title"
                    placeholder="Job Title"
                    value={title}
                    onChange={handleTitleChange}
                    helperText="Enter job position name"
                    fullWidth
                    sx={{ 
                        maxWidth: 400,
                        input: { 
                            color: isDarkMode ? "#ffffff" : "#000000",
                        },
                        label: { 
                            color: isDarkMode ? "#bbbbbb" : "#555555" 
                        },
                        fieldset: { 
                            borderColor: isDarkMode ? "##00897B" : "#ccc" 
                        },
                        "& .MuiInputBase-root": {
                            backgroundColor: isDarkMode ? "#333333" : "#ffffff"
                        }
                    }} 
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ 
                        height: "100%",
                        backgroundColor: isDarkMode ? "#00796B" : "#44BBA4",
                        color: "#ffffff",
                        "&:hover": {
                            backgroundColor: isDarkMode ? "#00897B" : "#3da693"
                        }
                    }}
                    onClick={handleJobSearch}
                >
                    Submit
                </Button>
            </Box>

            <div style={{ maxHeight: "auto", overflowY: "1000px" }}>
            <Results results={Array.isArray(results) && results.length > 0 ? results : (Array.isArray(savedJobs) ? savedJobs : [])} />
            </div>
        </div>
    );
}