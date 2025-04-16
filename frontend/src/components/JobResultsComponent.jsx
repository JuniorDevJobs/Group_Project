import React, { useState, useEffect } from "react";
import { Pagination, Box } from "@mui/material";

export default function Results({ results }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(darkModeQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener("change", handleChange);

        return () => darkModeQuery.removeEventListener("change", handleChange);
    }, []);

    const openModal = (job) => {
        setModalContent(job);
    };

    const closeModal = () => {
        setModalContent(null);
    };

    const checkUrl = (url, index) => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = url;

        iframe.onload = () => {
            handleValidUrl(index);
        };

        iframe.onerror = () => {
            handleInvalidUrl(index);
        };

        document.body.appendChild(iframe);
        setTimeout(() => document.body.removeChild(iframe), 5000);
    };

    const handleValidUrl = (index) => {
        const link = document.getElementById(`job-link-${index}`);
        if (link) {
            window.open(link.href, "_blank");
        }
    };

    const handleInvalidUrl = (index) => {
        alert("This link is invalid or cannot be accessed.");
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Paginate the results
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedResults = results?.slice(startIndex, startIndex + itemsPerPage) || [];

    return (
        <>
            {!results || results.length === 0 ? (
                <p></p>
            ) : (
                <>
                    <ul style={{ padding: 0, listStyleType: "none" }}>
                        {paginatedResults.map((job, index) => (
                            <li key={startIndex + index} style={{ marginBottom: "10px" }}>
                                <div
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <div style={{ flexGrow: 1 }}>
                                        <div>
                                            <strong>{job.title || "Junior Developer"}</strong> - {job.location} <br />
                                            {job.company}
                                        </div>

                                        <button
                                            onClick={() => openModal(job)}
                                            style={{
                                                marginLeft: "10px",
                                                cursor: "pointer",
                                                background: "none",
                                                border: "none",
                                                color: "#44BBA4",
                                                fontSize: "14px",
                                            }}
                                        >
                                            View Description
                                        </button>
                                    </div>

                                    <div style={{ marginTop: "5px" }}>
                                        <a
                                            id={`job-link-${startIndex + index}`}
                                            href={job.url}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                checkUrl(job.url, startIndex + index);
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: "none", color: "#44BBA4" }}
                                        >
                                            View Job
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination Component */}
                    <Box mt={3} display="flex" justifyContent="center">
                        <Pagination
                            count={Math.ceil(results.length / itemsPerPage)}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </>
            )}

            {/* Modal */}
            {modalContent && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: isDarkMode ? "#242323" : "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "50%",
                            maxWidth: "600px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <h3>{modalContent.title || "Job Description"}</h3>
                        <p>
                            <strong>Company:</strong> {modalContent.company}
                        </p>
                        <p>
                            <strong>Location:</strong> {modalContent.location}
                        </p>
                        <div
                            style={{
                                maxHeight: "300px",
                                overflowY: "auto",
                                padding: "10px",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                backgroundColor: isDarkMode ? "#2d2d2d" : "#f9f9f9",
                            }}
                            dangerouslySetInnerHTML={{
                                __html: modalContent.description || "No description available.",
                            }}
                        />

                        <button
                            onClick={closeModal}
                            style={{
                                marginTop: "15px",
                                padding: "8px 12px",
                                backgroundColor: "#44BBA4",
                                border: "none",
                                color: "#fff",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}