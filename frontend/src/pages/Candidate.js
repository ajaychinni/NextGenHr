import React from 'react';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import './style/Candidate.css'

function Candidate() {
  return (
    <div className="container mt-4">
      {/* Panel 1: AI Selected Candidates */}
      <div className="row mb-4">
        <div className="col">
          <h3>AI Selected Candidates</h3>
          <div className="candidate-panel ai-selected">
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
          </div>
        </div>
      </div>

      {/* Panel 2: AI Rejected Candidates */}
      <div className="row">
        <div className="col">
          <h3>AI Rejected Candidates</h3>
          <div className="candidate-panel ai-rejected">
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
            <div className="profile-card-wrapper"><ProfileCard /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Candidate;
