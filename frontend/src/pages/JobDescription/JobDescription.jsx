import React from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import axios from "axios";
import './JobDescription.css'
import { Link, useParams } from 'react-router-dom';




function JobDescription() {

  const { id } = useParams();

  const options = {

    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/job-details',
    params: {
      job_id: id,
      country: 'us'
    },
    headers: {
      'x-rapidapi-key': '3746e50262msh08374f47ca2e9c7p174479jsn05fd25f53639',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  fetchData();


  return (
    <div>
      <Navbar />

    </div>
  );
}

export default JobDescription;
