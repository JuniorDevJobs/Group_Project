import React, { useState, useEffect } from 'react';

export default function Results({ results }) {
    const [showDescription, setShowDescription] = useState({});
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handleChange);

        return () => darkModeQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleDescription = (index) => {
        setShowDescription(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <>
            {results.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                <ul style={{ padding: 0, listStyleType: "none" }}>
                    {results.map((job, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            <div style={{
                                border: "1px solid #ccc", 
                                padding: "10px", 
                                borderRadius: "5px", 
                                cursor: "pointer"
                            }}>
                                <div style={{ flexGrow: 1 }}>
                                    <div>
                                        <strong>{job.title || "Junior Developer"}</strong> - {job.location} <br />
                                        {job.company}
                                    </div>

                                    {/* Show Description Button */}
                                    <button 
                                        onClick={() => toggleDescription(index)} 
                                        style={{ marginLeft: '10px', cursor: 'pointer', background: "none", border: "none", color: "#44BBA4", fontSize: "14px" }}
                                    >
                                        {showDescription[index] ? "Hide Description" : "Show Description"}
                                    </button>
                                </div>

                                {/* Optionally show the description */}
                                {showDescription[index] && job.description && (
                                    <div style={{
                                        marginTop: "10px",
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        borderRadius: "5px",
                                        maxHeight: "200px", // Adjust this as needed for your design
                                        overflowY: "auto",  // Makes the content scrollable
                                        backgroundColor: isDarkMode ? "#242323" : "#f0f0f0", // Dynamic background color
                                        color: isDarkMode ? "#ffffff" : "#000000"
                                    }}>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: job.description || "No description available."
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Job link */}
                                <div style={{ marginTop: "5px" }}>
                                    <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#44BBA4" }}>
                                        View Job
                                    </a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}