import React from 'react';
import './FileUpload.css';

function FileUpload({ label, onFileChange }) {
  const handleFileChange = (event) => {
    if (onFileChange) {
      onFileChange(event.target.files[0]);
    }
  };

  return (
    <div className="file-upload">
      <label>{label}</label>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default FileUpload;
