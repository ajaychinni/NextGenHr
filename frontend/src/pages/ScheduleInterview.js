import React, { useState } from 'react';
import FileUpload from '../components/FileUpload/FileUpload';
import TextArea from '../components/TextArea/TextArea';
import DateTimePicker from '../components/DateTimePicker/DateTimePicker';
import Button from '../components/Button/Button';
import './style/ScheduleInterview.css'
import axios from 'axios';


function ScheduleInterview() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [extraQuestions, setExtraQuestions] = useState('');
  const [scheduledDateTime, setScheduledDateTime] = useState(null);

  // New state variables for messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleScheduleInterview = async () => {
    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');

    // Validate file inputs
    if (!resumeFile || !jobDescriptionFile) {
      setErrorMessage('Please upload both Resume and Job Description files.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_description', jobDescriptionFile);
    // Append other data if needed
    // formData.append('extra_questions', extraQuestions);
    // formData.append('scheduled_date_time', scheduledDateTime);

    try {
      const response = await axios.post(
        'http://localhost:8000/upload-files',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccessMessage(response.data.message);

      // Optionally, reset form fields after successful submission
      // setResumeFile(null);
      // setJobDescriptionFile(null);
      // setExtraQuestions('');
      // setScheduledDateTime(null);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to upload files.');
    }
  };

  return (
    <div className="schedule-interview">
      <div className="content-container">
        <h1>Schedule Interview</h1>



        {/* Upload Resume and Job Description */}
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

        {/* Extra Questions */}
        <div className="extra-questions">
          <label>Add Extra Questions / Comments for AI to ASK</label>
          <TextArea
            value={extraQuestions}
            onChange={(e) => setExtraQuestions(e.target.value)}
          />
        </div>

        {/* Date/Time Picker */}
        <div className="date-time-picker">
          <label>Date/Time Picker</label>
          <DateTimePicker
            value={scheduledDateTime}
            onChange={setScheduledDateTime}
          />
        </div>

        {/* Schedule Button */}
        <div className="schedule-button">
          <Button label="Schedule Interview" onClick={handleScheduleInterview} />
        </div>

        {/* Display Success or Error Messages */}
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default ScheduleInterview;
