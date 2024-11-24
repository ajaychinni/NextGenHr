import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import './style/Candidate.css';

function Candidate() {
  const [selectedJobId, setSelectedJobId] = useState('');

  const jobIds = ['Job ID 1', 'Job ID 2', 'Job ID 3', 'Job ID 4']; // Replace with your job IDs

  const handleJobChange = (event) => {
    setSelectedJobId(event.target.value);
  };

  return (
    <div className="container mt-4">
      {/* Top Bar with Dropdown */}
      <div className="row mb-4">
        <div className="col">
          <label htmlFor="jobDropdown" className="form-label">
          </label>
          <select
            id="jobDropdown"
            className="form-select"
            value={selectedJobId}
            onChange={handleJobChange}
          >
            <option value="">Select a Job ID</option>
            {jobIds.map((jobId) => (
              <option key={jobId} value={jobId}>
                {jobId}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Panel 1: AI Selected Candidates */}
      <div className="row mb-4">
        <div className="col">
          <h3>AI Selected Candidates</h3>
          <div className="candidate-panel ai-selected">
            <div className="profile-card-wrapper"><ProfileCard /></div>
            {/* Add more ProfileCard components dynamically as needed */}
          </div>
        </div>
      </div>

      {/* Panel 2: AI Rejected Candidates */}
      <div className="row">
        <div className="col">
          <h3>AI Rejected Candidates</h3>
          <div className="candidate-panel ai-rejected">
            <div className="profile-card-wrapper"><ProfileCard /></div>
            {/* Add more ProfileCard components dynamically as needed */}
          </div>
        </div>
      </div>

      {/* Bottom Center Update Button */}
      <div className="row mt-4">
        <div className="col text-center">
          <button className="btn btn-primary">Update</button>
        </div>
      </div>
    </div>
  );
}

export default Candidate;
