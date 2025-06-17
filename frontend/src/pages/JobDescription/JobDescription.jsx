import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function JobDescription() {
    const { id } = useParams(); // 👈 get the job ID from the URL
    const [job, setJob] = useState(null);

    useEffect(() => {
        // Fetch job details using the ID
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`https://jsearch.p.rapidapi.com/job-details?job_id=${id}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'YOUR_API_KEY',
                        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
                    }
                });
                const data = await response.json();
                setJob(data.data[0]); // Assuming response is in data.data[0]
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
    }, [id]);

    return (
        <div>
            <h2>Job Description</h2>
            {job ? (
                <div>
                    <h3>{job.job_title}</h3>
                    <p>{job.job_description}</p>
                    <p><strong>Company:</strong> {job.company_name}</p>
                    <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">Apply Now</a>
                </div>
            ) : (
                <p>Loading job details...</p>
            )}
        </div>
    );
}

export default JobDescription;
