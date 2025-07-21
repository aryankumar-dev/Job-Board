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
    const [loading, setLoading] = useState(false);

    const jobsPerPage = 3;
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

    const handleDateClick = (value) => setDatePosted(value);
    const handleTypeClick = (value) => setjobtype(value);

    const fetchData = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const submitData = () => fetchData();

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white">
            <ResponsiveNavbar />

            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg text-gray-800">
                    <h2 className="text-3xl font-bold mb-6 text-center">Find Your Dream Job</h2>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Job title"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4">
                        {['today', 'week', 'month'].map((date) => (
                            <button
                                key={date}
                                onClick={() => handleDateClick(date)}
                                className={`px-4 py-2 rounded-xl ${dateposted === date ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {date === 'today' && 'Last 24h'}
                                {date === 'week' && 'Last 7 days'}
                                {date === 'month' && 'Last 30 days'}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6">
                        {['Full-time', 'Part-time', 'Contract'].map((type) => (
                            <button
                                key={type}
                                onClick={() => handleTypeClick(type)}
                                className={`px-4 py-2 rounded-xl ${jobtype === type ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={submitData}
                            className="bg-purple-600 text-white px-6 py-3 rounded-2xl text-lg font-semibold hover:bg-purple-700 transition"
                        >
                            {loading ? 'Searching...' : 'Search Jobs'}
                        </button>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-3xl font-bold mb-6">Job Listings</h3>
                    {loading && <p className="text-lg">Loading jobs...</p>}

                    {currentJobs.length === 0 && !loading && (
                        <p className="text-lg">No jobs found. Try adjusting your filters.</p>
                    )}

                    <div className="space-y-6">
                        {currentJobs.map((job, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4 text-gray-800">
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold mb-2">{job.job_title}</h4>
                                    <p className="mb-1">{job.company_name} - {job.job_location}</p>
                                    <p className="mb-3 text-sm text-gray-600">Posted: {job.job_posted_at}</p>
                                    <Link to={`/jobdescription/${job.job_id}`}>
                                        <button className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition">View Details</button>
                                    </Link>
                                </div>
                                {job.employer_logo && (
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img src={job.employer_logo} alt="Logo" className="w-full h-full object-contain rounded-xl" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {jobs.length > jobsPerPage && (
                        <div className="flex justify-center mt-8 space-x-2">
                            {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-full ${currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} font-bold`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
