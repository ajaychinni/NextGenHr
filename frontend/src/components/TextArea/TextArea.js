// src/components/TextArea/TextArea.js

import React from 'react';
import './TextArea.css';

function TextArea({ value, onChange, placeholder }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      rows="5"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="custom-textarea" 
    />
  );
}

export default TextArea;
