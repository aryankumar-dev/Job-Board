import { React, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import axios from "axios";
import './JobDescription.css'
import { Link, useParams } from 'react-router-dom';




function JobDescription() {


  const [job, setJob] = useState(null);
  const { id } = useParams();


 useEffect(() => {
  async function fetchData() {
   
     try {
        const options = {
          method: 'GET',
          url: 'https://jsearch.p.rapidapi.com/job-details',
          params: {
            job_id: id,
            country: 'us'
          },
          headers: {
            'x-rapidapi-key': '86da03215dmshbca3ad8efc48440p17d35bjsnfb189da6ef35',
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
    <div>
      <Navbar />

      <div className='description-container'>
      
        
        {job ? (
          <>
            <p>Home / {job.job_title}</p>
            <h3>{job.job_title}</h3>
              <p>{job.employer_name} - {job.job_location}</p>
          
            <p>{job.job_description}</p>
            <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
              <button>Apply</button>
            </a>
          </>
        ) : (
          <p>Loading job details...</p>
        )}

      </div>

    </div>
  );
}

export default JobDescription;
