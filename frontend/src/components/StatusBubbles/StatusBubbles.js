import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatusBubbles.css';

const StatusBubbles = () => {
  const [statusData, setStatusData] = useState({
    total_candidates: 0,
    interview_completed: 0,
    interview_pending: 0,
  });

  useEffect(() => {
    // Fetch data from the API
    const fetchStatusData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/status-bubbles'); 
        setStatusData(response.data);
      } catch (error) {
        console.error("Error fetching status data:", error);
      }
    };

    fetchStatusData();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="status-bubbles">
      <div className="bubble total">
        <span>{statusData.total_candidates}</span>
        <p>Total Candidates</p>
      </div>
      <div className="bubble completed">
        <span>{statusData.interview_completed}</span>
        <p>Interview Completed</p>
      </div>
      <div className="bubble pending">
        <span>{statusData.interview_pending}</span>
        <p>Interview Pending</p>
      </div>
    </div>
  );
};

export default StatusBubbles;
