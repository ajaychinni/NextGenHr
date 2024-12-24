import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ProfileSwapConfirmPanel from '../components/ProfileSwapConfirmPanel/ProfileSwapConfirmPanel';
import './style/Candidate.css';

function Candidate() {
  const [jobIds, setJobIds] = useState([]); // List of job IDs
  const [selectedJobId, setSelectedJobId] = useState('');
  const [candidates, setCandidates] = useState([]); // Candidates based on job ID
  const [statusChanges, setStatusChanges] = useState([]); // Track status changes
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  // Fetch job IDs on component mount
  useEffect(() => {
    const fetchJobIds = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/candidate-profile/jobs');
        setJobIds(response.data);
      } catch (error) {
        console.error('Error fetching job IDs:', error);
      }
    };

    fetchJobIds();
  }, []);

  // Fetch candidates when a job ID is selected
  useEffect(() => {
    const fetchCandidates = async () => {
      if (!selectedJobId) return;

      try {
        const response = await axios.get(`http://127.0.0.1:8000/candidate-profile/${selectedJobId}`);
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, [selectedJobId]);

  const handleJobChange = (event) => {
    setSelectedJobId(event.target.value);
  };

  // Handle drag start
  const handleDragStart = (event, candidate) => {
    event.dataTransfer.setData('candidate', JSON.stringify(candidate));
  };

  // Handle drop
  const handleDrop = (event, newStatus) => {
    const candidate = JSON.parse(event.dataTransfer.getData('candidate'));

    // Update candidates list
    const updatedCandidates = candidates.map((c) =>
      c.candidate_id === candidate.candidate_id ? { ...c, status: newStatus } : c
    );
    setCandidates(updatedCandidates);

    // Track changes
    setStatusChanges((prevChanges) => {
      const existingChange = prevChanges.find(
        (change) => change.candidate_id === candidate.candidate_id
      );
      if (existingChange) {
        return prevChanges.map((change) =>
          change.candidate_id === candidate.candidate_id ? { ...change, status: newStatus } : change
        );
      }
      return [...prevChanges, { candidate_id: candidate.candidate_id, name: candidate.name, status: newStatus }];
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmChanges = () => {
    // TODO: Send changes to the backend API
    console.log('Confirmed changes:', statusChanges);
    setIsModalOpen(false);
  };

  const handleCancelChanges = () => {
    setIsModalOpen(false);
  };

  const handleRemoveChange = (candidateId) => {
    setStatusChanges((prevChanges) => prevChanges.filter((change) => change.candidate_id !== candidateId));
  };

  return (
    <div className="container mt-4">
      {/* Top Bar with Dropdown */}
      <div className="row mb-4">
        <div className="col">
          <label htmlFor="jobDropdown" className="form-label"></label>
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

      {/* Candidate Panels - Stacked Vertically */}
      <div className="row candidate-panel-wrapper">
        <div className="col">
          <h3>AI Selected Candidates</h3>
          <div
            className="candidate-panel ai-selected"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, 'Hired')}
          >
            {candidates.filter((candidate) => candidate.status === 'Hired').length > 0 ? (
              candidates
                .filter((candidate) => candidate.status === 'Hired')
                .map((candidate) => (
                  <div
                    key={candidate.candidate_id}
                    className="profile-card-wrapper"
                    draggable
                    onDragStart={(event) => handleDragStart(event, candidate)}
                  >
                    <ProfileCard candidate={candidate} />
                  </div>
                ))
            ) : (
              <div className="candidate-panel-placeholder">No candidates selected yet</div>
            )}
          </div>
        </div>

        <div className="col">
          <h3>AI Rejected Candidates</h3>
          <div
            className="candidate-panel ai-rejected"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, 'Rejected')}
          >
            {candidates.filter((candidate) => candidate.status === 'Rejected').length > 0 ? (
              candidates
                .filter((candidate) => candidate.status === 'Rejected')
                .map((candidate) => (
                  <div
                    key={candidate.candidate_id}
                    className="profile-card-wrapper"
                    draggable
                    onDragStart={(event) => handleDragStart(event, candidate)}
                  >
                    <ProfileCard candidate={candidate} />
                  </div>
                ))
            ) : (
              <div className="candidate-panel-placeholder">No candidates rejected yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Center Update Button */}
      <div className="row mt-4">
        <div className="col text-center">
          <button className="btn btn-primary" onClick={handleUpdateClick}>
            Update
          </button>
        </div>
      </div>

      {/* Profile Swap Confirm Panel */}
      <ProfileSwapConfirmPanel
        isOpen={isModalOpen}
        title="Confirm Changes"
        onClose={handleCancelChanges}
        onConfirm={handleConfirmChanges}
      >
        <ul>
          {statusChanges.map((change) => (
            <li key={change.candidate_id}>
              {change.name} - {change.status}
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => handleRemoveChange(change.candidate_id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </ProfileSwapConfirmPanel>
    </div>
  );
}

export default Candidate;
