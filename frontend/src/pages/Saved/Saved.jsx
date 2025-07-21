import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ResponsiveNavbar from '../../components/Navbar/Navbar.jsx';
import './Saved.css';

function Saved() {
  const location = useLocation();

  const [savedJobs, setSavedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem('savedJobs')) || [];
  });

  useEffect(() => {
    if (location.state?.job) {
      const jobToSave = location.state.job;
      const exists = savedJobs.some(j => j.job_id === jobToSave.job_id);
      if (!exists) {
        const updated = [...savedJobs, jobToSave];
        setSavedJobs(updated);
        localStorage.setItem('savedJobs', JSON.stringify(updated));
      }
    }
  }, [location.state]);

  const removeJob = (job_id) => {
    const filtered = savedJobs.filter(job => job.job_id !== job_id);
    setSavedJobs(filtered);
    localStorage.setItem('savedJobs', JSON.stringify(filtered));
  };

  return (
    <div className="saved-background">
      <ResponsiveNavbar />
      <div className="saved-page">
        <h2 className="savetitle">⭐ Your Saved Jobs</h2>
        {savedJobs.length === 0 ? (
          <p className="empty-message">You have no saved jobs.</p>
        ) : (
          <div className="table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company & Location</th>
                  <th>Posted At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {savedJobs.map(job => (
                  <tr key={job.job_id}>
                    <td>{job.job_title}</td>
                    <td>{job.employer_name} - {job.job_location}</td>
                    <td>{job.job_posted_at}</td>
                    <td>
                      <button className="remove-btn" onClick={() => removeJob(job.job_id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Saved;
