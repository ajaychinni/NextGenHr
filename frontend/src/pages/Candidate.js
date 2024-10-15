import React from 'react';
import ProfileCard from '../components/ProfileCard/ProfileCard';

function Candidate() {
  return (
    <div className="container mt-4">
      {/* Panel 1: AI Selected Candidates */}
      <div className="row mb-4">
        <div className="col">
          <h3>AI Selected Candidates</h3>
          <div
            className="d-flex justify-content-start"
            style={{
              backgroundColor: '#d4edda',
              padding: '10px',
              borderRadius: '5px',
              overflowX: 'auto', // Enable horizontal scroll
              whiteSpace: 'nowrap' 
            }}
          >
            <div className="me-3"><ProfileCard /></div>
            <div className="me-3"><ProfileCard /></div>
            <div className="me-3"><ProfileCard /></div>
            <div className="me-3"><ProfileCard /></div>
            <div className="me-3"><ProfileCard /></div>
          </div>
        </div>
      </div>

      {/* Panel 2: AI Rejected Candidates */}
      <div className="row">
        <div className="col">
          <h3>AI Rejected Candidates</h3>
          <div
            className="d-flex justify-content-start"
            style={{
              backgroundColor: '#f8d7da',
              padding: '10px',
              borderRadius: '5px',
              overflowX: 'auto', 
              whiteSpace: 'nowrap'
            }}
          >
            <div className="me-3"><ProfileCard /></div>
            <div className="me-3"><ProfileCard /></div>
            <div className="me-3"><ProfileCard /></div>
            <div className="me-3"><ProfileCard /></div>
            <div className="me-3"><ProfileCard /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Candidate;
