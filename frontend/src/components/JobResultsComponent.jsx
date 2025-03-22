import React from 'react';

export default function Results({ results }) {
    return (
        <>
            {results.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                <ul style={{ padding: 0, listStyleType: "none" }}>
                    {results.map((job, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            {/* Wrap the entire list item in an anchor tag */}
                            <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                                <div style={{
                                    border: "1px solid #ccc", 
                                    padding: "10px", 
                                    borderRadius: "5px", 
                                    cursor: "pointer"
                                }}>
                                    <strong>{job.title || "Junior Developer"}</strong> - {job.location}
                                    <br />
                                    {job.company} <br />
                                    {job.description}
                                    <small>Click to view job</small>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}