import { getSearches } from "../api/usersApi"
import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [savedjobs, setsavedjobs] = useState([])
    
    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    async function fetchSavedJobs(token) {
        console.log("fetching saved jobs")
        try {
            const jobs = await getSearches(token);
            console.log(jobs)
            setsavedjobs(jobs);
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