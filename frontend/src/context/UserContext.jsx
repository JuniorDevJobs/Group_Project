import { getSearches } from "../api/usersApi"
import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [savedjobs, setsavedjobs] = useState([])
    const token = localStorage.getItem("access");
    
    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            setLoggedIn(true);
            fetchSavedJobs(token);
        } else {
            console.error("No token found in localStorage!");
        }
    }, [loggedIn]);
    async function fetchSavedJobs() {
        const token = localStorage.getItem("access")
        try {
            const jobs = await getSearches(token);
            console.log("Jobs:", jobs)
            setsavedjobs(jobs);
            console.log("Updated savedjobs state:", savedjobs)
        } catch (error) {
            console.error("Error fetching saved jobs:", error);
        }
    }

    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn, savedjobs, setsavedjobs, fetchSavedJobs}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;