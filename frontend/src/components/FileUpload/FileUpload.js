import React from 'react';
import './FileUpload.css';

function FileUpload({ label }) {
  return (
    <div className="file-upload">
      <label>{label}</label>
      <input type="file" accept=".pdf,.doc,.docx" />
    </div>
  );
}

export default FileUpload;
