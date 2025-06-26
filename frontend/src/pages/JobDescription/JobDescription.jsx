import { React, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import axios from "axios";
import './JobDescription.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Apply from '../Apply/Apply.jsx';

function JobDescription() {
  const [showModal, setShowModal] = useState(false);
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

  useEffect(() => {
    async function fetchData() {
      try {
        const options = {
          method: 'GET',
          url: 'https://jsearch.p.rapidapi.com/job-details',
          params: { job_id: id, country: 'us' },
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
          }
        };

        const response = await axios.request(options);
        setJob(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  const saveAndGoSaved = () => {
    if (job) {
      navigate('/saved', { state: { job } });
    }
  };

  return (
    <div>
      <Navbar />

      <div className="description-container">
        {job ? (
          <>
            <div className="breadcrumb">
              <Link to="/">Home</Link> / <span>{job.job_title}</span>
            </div>

            <h2 className="job-title">{job.job_title}</h2>
            <p className="employer">
              {job.employer_name} - {job.job_location}
            </p>

            <section className="job-section">
              <h4>Job Description</h4>
              <p>{job.job_description}</p>
            </section>

            {job.job_benefits && job.job_benefits.length > 0 && (
              <section className="job-section">
                <h4>Job Benefits</h4>
                <ul>
                  {job.job_benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </section>
            )}

            <div className="btn-group">
              <button className="apply-btn" onClick={() => setShowModal(true)}>
                Apply Now
              </button>
              <button className="save-btn" onClick={saveAndGoSaved}>
                Save Job
              </button>
            </div>

            <Apply show={showModal} onClose={() => setShowModal(false)} />
          </>
        ) : (
          <p className="loading-text">Loading job details...</p>
        )}
      </div>
    </div>
  );
}

export default JobDescription;
