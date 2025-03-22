import React from 'react';

export default function Homepage() {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Junior Dev Jobs</h1>
                <p style={styles.subtitle}>Your one-stop platform to search for developer job posts from multiple websites!</p>
            </header>

            <section style={styles.descriptionSection}>
                <h2 style={styles.sectionTitle}>How It Works</h2>
                <p style={styles.description}>
                    Job search aggregates job posts from top job boards like Indeed and FindWork, all in one place. 
                    You can search for developer jobs based on location and get results from multiple sources, 
                    making it easier to find the perfect job that fits your needs.
                </p>
                <button
                    onClick={() => window.location.href = '/Jobsearch'}
                    style={styles.searchButton}
                >
                    Start Searching
                </button>
            </section>

          

            <footer style={styles.footer}>
                <p>© 2025 Job Finder. All rights reserved.</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    title: {
        fontSize: '3em',
        color: '#333',
    },
    subtitle: {
        fontSize: '1.2em',
        color: '#555',
    },
    descriptionSection: {
        marginBottom: '40px',
    },
    sectionTitle: {
        fontSize: '2em',
        color: '#333',
        marginBottom: '10px',
    },
    description: {
        fontSize: '1.1em',
        lineHeight: '1.6',
        color: '#555',
    },
    searchSection: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '40px',
    },
    searchDescription: {
        fontSize: '1.1em',
        marginBottom: '20px',
        color: '#555',
    },
    searchButton: {
        backgroundColor: '#44BBA4',
        color: '#fff',
        padding: '10px 20px',
        fontSize: '1.2em',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    searchButtonHover: {
        backgroundColor: '#369f8b',
    },
    footer: {
        textAlign: 'center',
        marginTop: '40px',
        fontSize: '0.9em',
        color: '#777',
    }
};