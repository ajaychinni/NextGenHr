import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './ProfileCard.css';

const ProfileCard = () => {
  return (
    <div className="card shadow-lg profile-card">
      <div className="card-body">
        
        {/* Flex container to align photo, score, and details */}
        <div className="d-flex mb-3">
          {/* Photo and Score Container */}
          <div className="d-flex flex-column align-items-center">
            {/* Photo Box */}
            <div className="photo-box d-flex justify-content-center align-items-center border mb-2">
              <p className="text-muted">Photo</p>
            </div>

            {/* Score Section */}
            <div className="score-box border text-center p-1">
              <p className="mb-0">100 / 100</p>
            </div>
          </div>

          {/* Job Title and Name Section */}
          <div className="job-name-section d-flex flex-column justify-content-center">
            {/* Job Title */}
            <div className="job-title border text-center p-1 mb-2">
              <h8 className="card-subtitle text-muted">AI Developer</h8>
            </div>

            {/* Name Section */}
            <div className="name-section border text-center p-1">
              <h6 className="card-title mb-0">Ajay Chinni</h6>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="description-box border p-1">
          <ul className="mb-0">
            <li>Great understanding of LLMs.</li>
            <li>Solid grasp of ML basics.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
