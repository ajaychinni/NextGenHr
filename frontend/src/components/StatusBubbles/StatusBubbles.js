// src/components/StatusBubbles/StatusBubbles.js
import React from 'react';
import './StatusBubbles.css';

const StatusBubbles = () => {
  return (
    <div className="status-bubbles">
      <div className="bubble total">
        <span>50</span>
        <p>Total Candidates</p>
      </div>
      <div className="bubble completed">
        <span>25</span>
        <p>Interview completed</p>
      </div>
      <div className="bubble pending">
        <span>25</span>
        <p>Interview Pending</p>
      </div>
    </div>
  );
};

export default StatusBubbles;
