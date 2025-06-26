import { React, useState } from 'react';
import ResponsiveNavbar from '../../components/Navbar/Navbar.jsx';
import axios from "axios";
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
    const [searchTitle, setSearchTitle] = useState("");
    const [location, setLocation] = useState("");
    const [dateposted, setDatePosted] = useState(null);
    const [jobtype, setjobtype] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobs, setJobs] = useState([]);

    const jobsPerPage = 3;
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

    const handleDateClick = (value) => setDatePosted(value);
    const handleTypeClick = (value) => setjobtype(value);

    const fetchData = async () => {
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: {
                query: searchTitle,
                page: '1',
                num_pages: '1',
                country: location,
                date_posted: dateposted,
                job_types: jobtype
            },
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'jsearch.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            setJobs(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const submitData = () => fetchData();

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    return (
        <div>
            <ResponsiveNavbar />
            <div className="filter-container">
                
                <input
                    type="text"
                    placeholder="Job title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className="filter-input"
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="filter-input"
                />

                <div className="filter-buttons">
                    <button onClick={() => handleDateClick('today')} className={dateposted === 'today' ? 'active' : ''}>
                        Last 24h
                    </button>
                    <button onClick={() => handleDateClick('week')} className={dateposted === 'week' ? 'active' : ''}>
                        Last 7 days
                    </button>
                    <button onClick={() => handleDateClick('month')} className={dateposted === 'month' ? 'active' : ''}>
                        Last 30 days
                    </button>
                </div>

                <div className="filter-buttons">
                    <button onClick={() => handleTypeClick('Full-time')} className={jobtype === 'Full-time' ? 'active' : ''}>
                        Full-time
                    </button>
                    <button onClick={() => handleTypeClick('Part-time')} className={jobtype === 'Part-time' ? 'active' : ''}>
                        Part-time
                    </button>
                    <button onClick={() => handleTypeClick('Contract')} className={jobtype === 'Contract' ? 'active' : ''}>
                        Contract
                    </button>
                </div>

                <button className="submit-btn" onClick={submitData}>Search Jobs</button>
            </div>

            <div className="job-list-container">
                <h3>Job Listings</h3>
                {currentJobs.map((job, index) => (
                    <div key={index} className="job-card">
                        <div className="job-info">
                            <h4>{job.job_title}</h4>
                            <p>{job.company_name} - {job.job_location}</p>
                            <p>Posted: {job.job_posted_at}</p>
                            <Link to={`/jobdescription/${job.job_id}`}>
                                <button className="view-btn">View Details</button>
                            </Link>
                        </div>
                        {job.employer_logo && (
                            <div className="job-logo">
                                <img src={job.employer_logo} alt="Logo" />
                            </div>
                        )}
                    </div>
                ))}

                {jobs.length > jobsPerPage && (
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={currentPage === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
