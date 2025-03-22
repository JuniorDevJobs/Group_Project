import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Results from "../components/JobResultsComponent";
import { fetchJobs } from "../api/jobs";

export default function JobSearch() {
    const [location, setLocation] = useState("");
    const [results, setResults] = useState(() => {
        const storedJobs = localStorage.getItem("jobs");
        return storedJobs ? JSON.parse(storedJobs) : [];
    });

    const handleJobSearch = async (e) => {
        e.preventDefault();

        const searchResults = await fetchJobs(location);
        if (searchResults) {
            localStorage.setItem("jobs", JSON.stringify(searchResults.jobs));
            setResults(searchResults.jobs);
        }
    };

    const handleChange = (e) => {
        setLocation(e.target.value);
    };

    return (
        <div className="page-container"
        style={{ paddingTop: "20px" }}
        >
            <h2 style={{ textAlign: "center", color: "#44BBA4" }}>Job Search</h2>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center", // This aligns the TextField and Button in one row
                    gap: 2, // Adds space between the elements
                    justifyContent: "center", // Center the elements horizontally
                }}
            >
                <TextField
                    required
                    id="location"
                    label="Location"
                    name="location"
                    placeholder="Job Location"
                    value={location}
                    onChange={handleChange}
                    helperText="Enter location to search for jobs"
                    fullWidth
                    sx={{ maxWidth: 400 }} // Restricting width for a cleaner look
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleJobSearch}
                    sx={{ height: "100%" }} // Make the button the same height as the input
                >
                    Submit
                </Button>
            </Box>

            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                <Results results={results} />
            </div>
        </div>
    );
}