import { React, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import axios from "axios";
import './JobDescription.css'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Apply from '../Apply/Apply.jsx';

function JobDescription() {
  const [showModal, setShowModal] = useState(false);
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const { id } = useParams();

  const saveAndGoSaved = () => {
    if (!job) return;
    navigate('/saved', { state: { job } });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const options = {
          method: 'GET',
          url: 'https://jsearch.p.rapidapi.com/job-details',
          params: { job_id: id },
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

  return (
    <div className="job-description-bg">
      <Navbar />
      <div className="description-container">
        {job ? (
          <>
            <div className="breadcrumb">Home / {job.job_title}</div>
            <h2 className="job-title">{job.job_title}</h2>
            <p className="company-location">{job.employer_name} - {job.job_location}</p>

            <h4>Job Description</h4>
            <p className="job-desc">{job.job_description}</p>

            {job.job_benefits && (
              <>
                <h4>Job Benefits</h4>
                <ul className="benefits-list">
                  {job.job_benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </>
            )}

            <div className="btn-group">
              <button className="apply-btn" onClick={() => setShowModal(true)}>Apply</button>
              <button className="save-btn" onClick={saveAndGoSaved}>Save Job</button>
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
