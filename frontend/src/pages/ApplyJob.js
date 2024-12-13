import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload/FileUpload';
import TextArea from '../components/TextArea/TextArea'; 
import Button from '../components/Button/Button';
import './style/ApplyJob.css';
import axios from 'axios';

function ApplyJob() {
  const [resumeFile, setResumeFile] = useState(null);

  const [resumeDetails, setResumeDetails] = useState({
    email: '',
    name: '',
    summary: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('resumeDetails updated:', resumeDetails);
  }, [resumeDetails]);

  async function handleApplyJob() {
    setSuccessMessage('');
    setErrorMessage('');
    setLoading(true);
  
    if (!resumeFile) {
      console.log('No resume file uploaded.');
      setErrorMessage('Please upload a resume file.');
      setLoading(false);
      return;
    }
  
    try {
      // Prepare FormData for file upload
      const formData = new FormData();
      formData.append('resume', resumeFile);
  
      // Add hardcoded job_description
      const dummyFile = new File(
        [new Blob(["Dummy Job Description"], { type: 'application/pdf' })],
        '/Users/ajay/NextGenHR/NextGenHr/data/jobDescription/roku.pdf',
        { type: 'application/pdf' }
      );
      formData.append('job_description', dummyFile);
  
      console.log('Uploading files to http://localhost:8000/upload-files...');
      const uploadResponse = await axios.post('http://localhost:8000/upload-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Upload response:', uploadResponse);
  
      if (uploadResponse.status === 200) {
        const { 
          resume_path, 
          job_description_path, 
          resume_text, 
          job_description_text 
        } = uploadResponse.data;
  
        if (!resume_path || !resume_text) {
          console.error('No resume_path or resume_text returned from the server. Check your endpoint response.');
          setErrorMessage('No resume text could be retrieved. Please ensure the file is valid.');
          setLoading(false);
          return;
        }
  
        console.log('Extracted resume text:', resume_text);
        console.log('Extracted job description text:', job_description_text);
  
        // Extract Email and Name
        console.log('Requesting email and name extraction...');
        const resumeEmailNameRequest = axios.post('http://localhost:8000/resumeExtraction/email_name', {
          resume_text: resume_text,
        });
  
        // Extract Resume Summary
        console.log('Requesting resume summary extraction...');
        const resumeSummaryRequest = axios.post('http://localhost:8000/resumeExtraction/resume_summary', {
          resume_text: resume_text,
        });
        
        console.log('Requesting job skills extraction...');
        const jobRoleSkillsRequest = axios.post('http://localhost:8000/jobDescriptionExtraction/jobRole_skills', {
          jd_text: job_description_text,
        });
  
        const [resumeEmailNameResponse, resumeSummaryResponse, jobRoleSkillsResponse] = await Promise.all([
          resumeEmailNameRequest,
          resumeSummaryRequest,
          jobRoleSkillsRequest
        ]);
  
        console.log('Email/Name extraction response:', resumeEmailNameResponse.data);
        console.log('Summary extraction response:', resumeSummaryResponse.data);
        console.log('Job skills extraction response:', jobRoleSkillsResponse.data);

        console.log('Status:', jobRoleSkillsResponse.status);
        console.log('Data exists:', !!jobRoleSkillsResponse.data);
        console.log('Skills is array:', Array.isArray(jobRoleSkillsResponse.data?.skills));
  
        // Update Resume Details based on the responses
        if (resumeEmailNameResponse.status === 200 && resumeEmailNameResponse.data) {
          const { email, name } = resumeEmailNameResponse.data;
          console.log('Extracted email:', email, 'Extracted name:', name);
          setResumeDetails((prev) => ({
            ...prev,
            email: email || '',
            name: name || '',
          }));
        } else {
          console.warn('Email/Name extraction did not return expected data.');
        }
  
        if (resumeSummaryResponse.status === 200 && resumeSummaryResponse.data) {
          const summary = resumeSummaryResponse.data.summary;
          console.log('Extracted summary:', summary);
          setResumeDetails((prev) => ({
            ...prev,
            summary: summary || '',
          }));
        } else {
          console.warn('Summary extraction did not return expected data.');
        }

        // If jobRoleSkillsResponse returned an array of skills, process them one by one
        if (
          jobRoleSkillsResponse.status === 200 && 
          jobRoleSkillsResponse.data && 
          Array.isArray(jobRoleSkillsResponse.data.skills)
        ) {
          const skills = jobRoleSkillsResponse.data.skills;
          console.log('Job Role Skills:', skills);
        
          const skillAnalysisResults = [];
        
          // Process each skill sequentially
          for (const skill of skills) {
            const response = await axios.post('http://localhost:8000/skillScoreExtraction/skill_analysis', {
              resume_text: resume_text,
              skill: skill
            });
        
            skillAnalysisResults.push({
              skill: skill,
              score: response.data.score,
              reason: response.data.reason
            });
          }
        
          console.log('Skill analysis results:', skillAnalysisResults);
        
        } else {
          console.warn('No skills returned from jobRoleSkillsResponse or response not OK.');

        }
        
        
  
        console.log('Resume details and skill analysis extracted successfully!');
        setSuccessMessage('Resume details and skill analysis extracted successfully!');
      } else {
        console.error('Failed to upload resume. Status:', uploadResponse.status);
        setErrorMessage('Failed to upload resume. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading or processing resume:', error);
      setErrorMessage('An error occurred while processing your request. Please try again.');
    } finally {
      setLoading(false);
      console.log('Done processing apply job request.');
    }
  }
  


  return (
    <div className="apply-job">
      <div className="content-container">
        <h1>Apply for the Job</h1>

        <div className="upload-section">
          <FileUpload
            label="Upload Resume (PDF, Doc)"
            onFileChange={(file) => {
              console.log('File chosen:', file);
              setResumeFile(file);
            }}
          />
        </div>

        {resumeFile && (
          <div className="resume-details">
            <h2>Resume Details</h2>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={resumeDetails.email}
                onChange={(e) =>
                  setResumeDetails((prev) => ({ ...prev, email: e.target.value }))
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
                  setResumeDetails((prev) => ({ ...prev, name: e.target.value }))
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

        <div className="apply-button">
          <Button
            label="Apply Job"
            onClick={handleApplyJob}
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

export default ApplyJob;
