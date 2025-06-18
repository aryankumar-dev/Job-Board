import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Saved.css';
function Saved() {
  const location = useLocation();

  const [savedJobs, setSavedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem('savedJobs')) || [];
  });

  useEffect(() => {
    if (location.state?.job) {
      const jobToSave = location.state.job;

      // Check if job already exists
      const exists = savedJobs.some(j => j.job_id === jobToSave.job_id);
      if (!exists) {
        const updated = [...savedJobs, jobToSave];
        setSavedJobs(updated);
        localStorage.setItem('savedJobs', JSON.stringify(updated));
      }
    }
    // We only want to trigger this when location.state changes
  }, [location.state]);

  // Remove job handler
  const removeJob = (job_id) => {
    const filtered = savedJobs.filter(job => job.job_id !== job_id);
    setSavedJobs(filtered);
    localStorage.setItem('savedJobs', JSON.stringify(filtered));
  };

  if (savedJobs.length === 0) {
    return <p style={{ padding: '20px' }}>You have no saved jobs.</p>;
  }

  return (
    <div className="saved-page" >
      <h2 className="savetitle">Saved Jobs</h2>
      <table  border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                <button onClick={() => removeJob(job.job_id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Saved;





// folllow code - 4
// apply code -5 
// react video - 3 

// resume update  - 10
// apply 5 company at least - 12 
// start with backend 

