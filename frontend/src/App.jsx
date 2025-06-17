import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Apply from './pages/Apply/Apply.jsx';
import Saved from './pages/Saved/Saved.jsx';
import JobDescription from './pages/JobDescription/JobDescription.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/jobdescription" element={<JobDescription />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
