// src/App.js
import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar'
import ScheduleInterview from './pages/ScheduleInterview';
import Candidate from './pages/Candidate';
import { Route, Routes } from "react-router-dom"

function App() {
  return  (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/schedule_interview" element={<ScheduleInterview />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
