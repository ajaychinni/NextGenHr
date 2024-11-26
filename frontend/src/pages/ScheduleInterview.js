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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [resumeDetails, setResumeDetails] = useState({
    email: '',
    name: '',
    summary: '',
  });

  const [jobDetails, setJobDetails] = useState({
    role: '',
    skills: '',
    description: '',
  });

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
    formData.append('email', resumeDetails.email);
    formData.append('name', resumeDetails.name);
    formData.append('summary', resumeDetails.summary);
    formData.append('role', jobDetails.role);
    formData.append('skills', jobDetails.skills);
    formData.append('job_description_text', jobDetails.description);

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
            onFileChange={(file) => setResumeFile(file)}
          />
          <FileUpload
            label="Upload Job Description (PDF, Doc)"
            onFileChange={(file) => setJobDescriptionFile(file)}
          />
        </div>

        {/* Resume Details Section */}
        {resumeFile && (
          <div className="resume-details">
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={resumeDetails.email}
                onChange={(e) =>
                  setResumeDetails({ ...resumeDetails, email: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={resumeDetails.name}
                onChange={(e) =>
                  setResumeDetails({ ...resumeDetails, name: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label>Resume Summary</label>
              <TextArea
                value={resumeDetails.summary}
                onChange={(e) =>
                  setResumeDetails({ ...resumeDetails, summary: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* Job Description Details Section */}
        {jobDescriptionFile && (
          <div className="job-details">
            <div className="field">
              <label>Job Role</label>
              <input
                type="text"
                value={jobDetails.role}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, role: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label>Skills</label>
              <input
                type="text"
                value={jobDetails.skills}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, skills: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label>Job Description</label>
              <TextArea
                value={jobDetails.description}
                onChange={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}

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