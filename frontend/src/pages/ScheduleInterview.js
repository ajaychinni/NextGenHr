import React, { useState } from 'react';
import FileUpload from '../components/FileUpload/FileUpload';
import TextArea from '../components/TextArea/TextArea';
import DateTimePicker from '../components/DateTimePicker/DateTimePicker';

import Button from '../components/Button/Button';
import './style/ScheduleInterview.css';
import axios from 'axios';

function ScheduleInterview() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [extraQuestions, setExtraQuestions] = useState('');
  const [startDate, setStartDate] = useState(null); // For start date
  const [endDate, setEndDate] = useState(null); // For end date

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleScheduleInterview = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    if (!resumeFile || !jobDescriptionFile) {
      setErrorMessage('Please upload both Resume and Job Description files.');
      return;
    }

    if (!startDate || !endDate) {
      setErrorMessage('Please select a start and end date.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_description', jobDescriptionFile);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);

    try {
      const response = await axios.post(
        'http://localhost:8000/schedule-interview',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to schedule the interview.');
    }
  };

  return (
    <div className="schedule-interview">
      <div className="content-container">
        <h1>Schedule Interview</h1>

        <div className="upload-section">
          <FileUpload
            label="Upload Resume (PDF, Doc)"
            onFileChange={setResumeFile}
          />
          <FileUpload
            label="Upload Job Description (PDF, Doc)"
            onFileChange={setJobDescriptionFile}
          />
        </div>

        <div className="extra-questions">
          <label>Add Extra Questions / Comments for AI to ASK</label>
          <TextArea
            value={extraQuestions}
            onChange={(e) => setExtraQuestions(e.target.value)}
          />
        </div>

        <div className="date-range-picker">
          <div className="date-picker">
            <label>Start Date</label>
            <DateTimePicker value={startDate} onChange={setStartDate} />
          </div>
          <div className="date-picker">
            <label>End Date</label>
            <DateTimePicker value={endDate} onChange={setEndDate} />
          </div>
        </div>

        <div className="schedule-button">
          <Button label="Schedule Interview" onClick={handleScheduleInterview} />
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default ScheduleInterview;
