import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfileCard.css';

const ProfileCard = ({ candidate }) => {
  const { name, photo_url, score, job_title, short_summary } = candidate;

  return (
    <div className="card shadow-lg profile-card">
      <div className="card-body">
        <div className="d-flex mb-3">
          {/* Photo and Score Container */}
          <div className="d-flex flex-column align-items-center">
            {/* Photo */}
            <div className="photo-box d-flex justify-content-center align-items-center border mb-2">
              {photo_url ? (
                <img src={photo_url} alt={`${name}'s photo`} className="img-fluid" />
              ) : (
                <p className="text-muted">Photo</p>
              )}
            </div>

            {/* Score */}
            <div className="score-box border text-center p-1">
              <p className="mb-0">{score} / 100</p>
            </div>
          </div>

          {/* Name and Job Title */}
          <div className="job-name-section d-flex flex-column justify-content-center ms-3">
            {/* Name */}
            <div className="name-section border text-center p-1 mb-2">
              <h5 className="card-title mb-0">{name}</h5>
            </div>
            {/* Job Title */}
            <div className="job-title border text-center p-1">
              <h6 className="card-subtitle text-muted mb-0">{job_title}</h6>
            </div>
          </div>
        </div>

        {/* Short Summary */}
        <div className="description-box border p-2">
          <p className="mb-0 text-truncate">{short_summary}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
