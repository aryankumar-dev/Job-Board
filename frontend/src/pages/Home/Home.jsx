import { React, useState } from 'react';
import ResponsiveNavbar from '../../components/Navbar/Navbar.jsx';
import JobDescription from '../JobDescription/JobDescription.jsx'
import axios from "axios";
import './Home.css'
import { Link } from 'react-router-dom';

function Home() {
    const [searchTitle, setSearchTitle] = useState("");
    const [location, setLocation] = useState("");
    const [dateposted, setDatePosted] = useState(null);

    const [jobtype, setjobtype] = useState(null);
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 3;
    const [jobs, setJobs] = useState([]);


    const handleDateClick = (value) => {
        setDatePosted(value);
    };

    const handleTypeClick = (value) => {
        setjobtype(value);
    };

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
                job_types: jobtype // <- Add this line
            },
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'jsearch.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            console.log(response);
            setJobs(response.data.data); // Save jobs
        } catch (error) {
            console.error(error);
        }
    }

    function sumitdata() {
        fetchData();
    }


    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);


    return (
        <div>
            <ResponsiveNavbar />
            <div className='inputboxall'>
                <input
                    type="text"
                    placeholder="Search for jobs"
                    value={searchTitle}
                    className='inputbox'
                    onChange={(e) => setSearchTitle(e.target.value)}
                    style={{ marginRight: '10px', padding: '8px' }}
                />

                <div className='inputbtns'>
                    <button
                        onClick={() => handleDateClick('today')}
                        style={{
                            marginRight: '10px',
                            backgroundColor: dateposted === 'today' ? '#4caf50' : '#e0e0e0',
                            color: dateposted === 'today' ? 'white' : 'black'
                        }}
                    >
                        Last 24h
                    </button>
                    <button
                        onClick={() => handleDateClick('week')}
                        style={{
                            marginRight: '10px',
                            backgroundColor: dateposted === 'week' ? '#4caf50' : '#e0e0e0',
                            color: dateposted === 'week' ? 'white' : 'black'
                        }}
                    >
                        Last 7 days
                    </button>
                    <button
                        onClick={() => handleDateClick('month')}
                        style={{
                            backgroundColor: dateposted === 'month' ? '#4caf50' : '#e0e0e0',
                            color: dateposted === 'month' ? 'white' : 'black'
                        }}
                    >
                        Last 30 days
                    </button>
                </div>


                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    className='inputboxlocation'
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ padding: '8px' }}
                />

                <div className='inputbtns'>
                    <button
                        onClick={() => handleTypeClick('Full-time')}
                        style={{
                            marginRight: '10px',
                            backgroundColor: jobtype === 'Full-time' ? '#4caf50' : '#e0e0e0',
                            color: jobtype === 'Full-time' ? 'white' : 'black'
                        }}
                    >
                        Full-time
                    </button>
                    <button
                        onClick={() => handleTypeClick('Part-time')}
                        style={{
                            marginRight: '10px',
                            backgroundColor: jobtype === 'Part-time' ? '#4caf50' : '#e0e0e0',
                            color: jobtype === 'Part-time' ? 'white' : 'black'
                        }}
                    >
                        Part-time
                    </button>
                    <button
                        onClick={() => handleTypeClick('Contract')}
                        style={{
                            backgroundColor: jobtype === 'Contract' ? '#4caf50' : '#e0e0e0',
                            color: jobtype === 'Contract' ? 'white' : 'black'
                        }}
                    >
                        Contract
                    </button>
                    <button
                        onClick={sumitdata}
                        style={{
                            marginLeft: '40px',

                            padding: '10px 20px',
                            backgroundColor: '#2196f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Submit
                    </button>

                </div>



            </div>
            <div className='joblisting'>
                <h4>Job Listings</h4>
                <div className="job-list">
                    {currentJobs.map((job, index) => (
                        <div key={index} className="job-card">
                            <div className="job-list-text">
                                <p>{job.job_posted_at}</p>
                                <h3>{job.job_title}</h3>
                                <p>{job.company_name}</p>
                                <p>{job.employer_name} - {job.job_location}</p>

                                <Link to={`/jobdescription/${job.job_id}`}>
                                    <button>View Details</button>
                                </Link>
                            </div>

                            <div className="job-list-image">
                                <img alt="Employer Logo" src={job.employer_logo} />

                            </div>


                        </div>

                    ))}
                </div>
                <div className="pagination">
                    {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            style={{
                                margin: '5px',
                                backgroundColor: currentPage === i + 1 ? '#4caf50' : '#e0e0e0'
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

            </div>




        </div>
    );
}

export default Home;


