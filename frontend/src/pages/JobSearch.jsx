import { useState } from "react"
import { IconButton, TextField, Button, Box } from "@mui/material"
import Results from "../components/JobResultsComponent"
import  {fetchJobs } from "../api/jobs"
export default function JobSearch() {
    const [location, setLocation] = useState("")
    const token = localStorage.getItem("access")
    const handleJobSearch = async (e) => {
        e.preventDefault()

        const searchResults = await fetchJobs(location, token)
        localStorage.setItem("jobs", JSON.stringify(searchResults))
    }

    const handleChange = (e) => {
        setLocation(e.target.value
        );
    }

    return (
        <>
        <Box 
            sx = {{margin:2}}
            >
        <TextField
            required
            id="location"
            label="location"
            name="location"
            placeholder="Job Location"
            value={location}
            onChange={handleChange}
        />
        <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleJobSearch}
            // endIcon={<SendIcon />} // ✅ Adds icon at the end of the button
        >
            Submit
        </Button>
        </Box>
        <Results />
        </>
    )
}