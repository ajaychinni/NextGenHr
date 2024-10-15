import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileCard = () => {
  return (
    <div className="card shadow-lg" style={{ width: "300px", margin: "auto", padding: "2px" }}>
      <div className="card-body">
        
        {/* Flex container to align photo, score, and details */}
        <div className="d-flex mb-3">
          {/* Photo and Score Container */}
          <div className="d-flex flex-column align-items-center">
            {/* Photo Box */}
            <div
              className="d-flex justify-content-center align-items-center border mb-2"
              style={{ width: "60px", height: "60px", borderRadius: "50%", marginBottom: "2px" }}
            >
              <p className="text-muted">Photo</p>
            </div>

            {/* Score Section */}
            <div
              className="border text-center p-1"
              style={{ width: "90px", height: "40px" }}
            >
              <p className="mb-0">100 / 100</p>
            </div>
          </div>

          {/* Job Title and Name Section */}
          <div className="d-flex flex-column justify-content-center" style={{ marginLeft: "15px" }}>
            {/* Job Title */}
            <div className="border text-center p-1 mb-2" style={{ width: "150px" }}>
              <h8 className="card-subtitle text-muted">AI Developer</h8>
            </div>

            {/* Name Section */}
            <div className="border text-center p-1" style={{ width: "150px" }}>
              <h6 className="card-title mb-0">Ajay Chinni</h6>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border p-1">
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
