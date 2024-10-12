import React from 'react';
import FileUpload from '../components/FileUpload/FileUpload';
import TextArea from '../components/TextArea/TextArea';
import DateTimePicker from '../components/DateTimePicker/DateTimePicker';
import Button from '../components/Button/Button';

function ScheduleInterview() {
  return (
    <div className="schedule-interview">

      <div className="content-container">
        <h1>Schedule Interview</h1>

        {/* Upload Resume and JD*/}
        <div className="upload-section">
          <FileUpload label="Upload Resume (PDF, Doc)" />
          <FileUpload label="Upload Job Description (PDF, Doc)" />
        </div>

        {/* Extra Questions */}
        <div className="extra-questions">
          <label>Add Extra Questions / Comments for AI to ASK</label>
          <TextArea />
        </div>

        {/* Date/Time Picker */}
        <div className="date-time-picker">
          <label>Date/Time Picker</label>
          <DateTimePicker />
        </div>

        {/* Schedule Button */}
        <div className="schedule-button">
          <Button label="Schedule Interview" />
        </div>
      </div>
    </div>
  );
}

export default ScheduleInterview;
