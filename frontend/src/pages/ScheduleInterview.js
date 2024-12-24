import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false); // Optional: To handle loading state

  // Debugging state changes
  useEffect(() => {
    // console.log('resumeDetails updated:', resumeDetails);
  }, [resumeDetails]);

  useEffect(() => {
    // console.log('jobDetails updated:', jobDetails);
  }, [jobDetails]);

  const handleScheduleInterview = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true); // Start loading
  
    // Input Validations
    if (!resumeFile || !jobDescriptionFile) {
      setErrorMessage('Please upload both Resume and Job Description files.');
      setLoading(false);
      return;
    }
  
    if (!startDate || !endDate) {
      setErrorMessage('Please select a start and end date.');
      setLoading(false);
      return;
    }
  
    try {
      // Prepare FormData for file upload
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('job_description', jobDescriptionFile);
  
      // Upload files to FastAPI
      const uploadResponse = await axios.post('http://localhost:8000/upload-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (uploadResponse.status === 200) {
        const { resume_path, job_description_path, resume_text, job_description_text } = uploadResponse.data;
  
        // Prepare requests for extracting details
        const resumeEmailNameRequest = axios.post('http://localhost:8000/resumeExtraction/email_name', {
          resume_text,
        });
  
        const resumeSummaryRequest = axios.post('http://localhost:8000/resumeExtraction/resume_summary', {
          resume_text,
        });
  
        const jobRoleSkillsRequest = axios.post('http://localhost:8000/jobDescriptionExtraction/jobRole_skills', {
          jd_text: job_description_text,
        });
  
        const jdSummaryRequest = axios.post('http://localhost:8000/jobDescriptionExtraction/jd_summary', {
          jd_text: job_description_text,
        });
  
        // Execute all requests concurrently
        const [
          resumeEmailNameResponse,
          resumeSummaryResponse,
          jobRoleSkillsResponse,
          jdSummaryResponse,
        ] = await Promise.all([
          resumeEmailNameRequest,
          resumeSummaryRequest,
          jobRoleSkillsRequest,
          jdSummaryRequest,
        ]);
  
        // Variables to hold the required data
        let candidateEmail = '';
        let candidateName = '';
        let jobRole = '';
        let jobDescription = '';
  
        // Update Resume Details and extract candidateEmail and candidateName
        if (resumeEmailNameResponse.status === 200 && resumeEmailNameResponse.data) {
          const { email, name } = resumeEmailNameResponse.data;
          candidateEmail = email || '';
          candidateName = name || '';
          setResumeDetails((prev) => ({
            ...prev,
            email: candidateEmail,
            name: candidateName,
          }));
        }
  
        if (resumeSummaryResponse.status === 200 && resumeSummaryResponse.data) {
          const summary = resumeSummaryResponse.data.summary;
          setResumeDetails((prev) => ({
            ...prev,
            summary: summary || '',
          }));
        }
  
        // Update Job Details and extract jobRole and jobDescription
        if (jobRoleSkillsResponse.status === 200 && jobRoleSkillsResponse.data) {
          const { jobRole: extractedJobRole, skills } = jobRoleSkillsResponse.data;
          jobRole = extractedJobRole || '';
          setJobDetails((prev) => ({
            ...prev,
            role: jobRole,
            skills: Array.isArray(skills) ? skills.join(', ') : skills || '',
          }));
        }
  
        if (jdSummaryResponse.status === 200 && jdSummaryResponse.data) {
          const summary = jdSummaryResponse.data.summary;
          jobDescription = summary || '';
          setJobDetails((prev) => ({
            ...prev,
            description: jobDescription,
          }));
        }
  
        // Now that we have all details, proceed to call the emailText/generate endpoint
  
        // Format the dates as "YYYY-MM-DD"
        const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
  
        // Prepare the payload
        const emailPayload = {
          email_address: candidateEmail,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          job_role: jobRole,
          job_description: job_description_path, // Path to the uploaded job description PDF
        };
  
        // Send the POST request to the FastAPI endpoint
        const emailResponse = await axios.post('http://localhost:8000/emailText/generate', emailPayload);
  
        if (emailResponse.status === 200) {
          setSuccessMessage(emailResponse.data.status);
          console.log('Generated Email Text:', emailResponse.data.email_text); // Debugging
        } else {
          setErrorMessage('Failed to send email. Please try again.');
        }
      } else {
        setErrorMessage('Failed to upload files. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading or processing files:', error);
      setErrorMessage('An error occurred while processing your request. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };
  
  return (
    <div className="schedule-interview">
      <div className="content-container">
        <h1>Schedule Interview</h1>

        <div className="upload-section">
          {/* Correctly Passing setResumeFile and setJobDescriptionFile */}
          <FileUpload
            label="Upload Resume (PDF, Doc)"
            onFileChange={(file) => {
              // console.log('Resume File Selected:', file); // Debugging
              setResumeFile(file);
            }}
          />
          <FileUpload
            label="Upload Job Description (PDF, Doc)"
            onFileChange={(file) => {
              // console.log('Job Description File Selected:', file); // Debugging
              setJobDescriptionFile(file);
            }}
          />
        </div>

        {/* Resume Details Section */}
        {resumeFile && (
          <div className="resume-details">
            <h2>Resume Details</h2>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={resumeDetails.email}
                onChange={(e) =>
                  setResumeDetails({ ...resumeDetails, email: e.target.value })
                }
                placeholder="john.doe@gmail.com"
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
                placeholder="John Doe"
              />
            </div>
            <div className="field">
              <label>Resume Summary</label>
              <TextArea
                value={resumeDetails.summary}
                onChange={(value) =>
                  setResumeDetails((prev) => ({ ...prev, summary: value }))
                }
                placeholder="Enter resume summary here..."
              />
            </div>
          </div>
        )}

        {/* Job Description Details Section */}
        {jobDescriptionFile && (
          <div className="job-details">
            <h2>Job Description Details</h2>
            <div className="field">
              <label>Job Role</label>
              <input
                type="text"
                value={jobDetails.role}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, role: e.target.value })
                }
                placeholder="e.g., Senior Software Engineer"
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
                placeholder="e.g., Python, JavaScript, React"
              />
            </div>
            <div className="field">
              <label>Job Description</label>
              <TextArea
                value={jobDetails.description}
                onChange={(value) =>
                  setJobDetails((prev) => ({ ...prev, description: value }))
                }
                placeholder="Enter job description summary here..."
              />
            </div>
          </div>
        )}

        <div className="extra-questions">
          <label>Add Extra Questions / Comments for AI to ASK</label>
          {/* Replaced TextArea with native textarea */}
          <textarea
            value={extraQuestions}
            onChange={(e) => setExtraQuestions(e.target.value)}
            placeholder="Any additional questions or comments..."
            rows={5} // Adjust rows as needed
            style={{ width: '100%', resize: 'vertical' }} // Makes textarea full width and vertically resizable
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
          <Button
            label="Schedule Interview"
            onClick={handleScheduleInterview}
            disabled={loading}
          />
          {loading && <span className="loading-indicator">Processing...</span>}
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

      </div>
    </div>
  );
}

export default ScheduleInterview;