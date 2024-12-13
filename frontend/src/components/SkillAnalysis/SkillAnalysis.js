import React from 'react';
import './SkillAnalysis.css';

const SkillAnalysis = ({ skills }) => {
  return (
    <div className="skill-analysis-container">
      {skills.map((item, index) => (
        <div className="skill-analysis-item" key={index}>
          <div className="skill-circle">
            <span>{(item.score * 100).toFixed(0)}%</span>
          </div>
          <div className="skill-text">
            <h3>{item.skill}</h3>
            <p>{item.reason}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillAnalysis;
