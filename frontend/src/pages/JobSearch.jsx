import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import Results from "../components/JobResultsComponent";
import { fetchJobs } from "../api/jobs";

export default function JobSearch() {
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [results, setResults] = useState(() => {
        const storedJobs = localStorage.getItem("jobs");
        return storedJobs ? JSON.parse(storedJobs) : [];
    });

    useEffect(() => {
        // Detect system preference for dark mode
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handleChange);

        return () => darkModeQuery.removeEventListener('change', handleChange);
    }, []);

    const handleJobSearch = async (e) => {
        e.preventDefault();
        const context = {"location": location, "title": title}
        const searchResults = await fetchJobs(context);
        if (searchResults.jobs) {
            localStorage.setItem("jobs", JSON.stringify(searchResults.jobs));
            setResults(searchResults.jobs);
        } else {
            localStorage.setItem("jobs", JSON.stringify(searchResults.cached_jobs))
            setResults(searchResults.cached_jobs)
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
                <Results results={results} />
            </div>
        </div>
    );
}