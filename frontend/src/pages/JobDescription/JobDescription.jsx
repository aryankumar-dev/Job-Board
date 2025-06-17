import { React, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import axios from "axios";
import './JobDescription.css'
import { Link, useParams } from 'react-router-dom';




function JobDescription() {


  const [jobs, setJobs] = useState([]);
  const { id } = useParams();

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

  async function fetchData() {
    try {
      const response = await axios.request(options);

      console.log(response);
      setJobs(response.data.data); // Save jobs

    } catch (error) {
      console.error(error);
    }
  }

  fetchData();


  return (
    <div>
      <Navbar />

      <div className='description-container'>
        <p>Home/</p>
       
          <h3>{job.job_title}</h3>
        
      </div>

    </div>
  );
}

export default JobDescription;
