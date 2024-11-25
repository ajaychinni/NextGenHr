import React, { useState } from 'react';
import './DateTimePicker.css';

function DateTimePicker({ value, onChange }) {
  const handleDateChange = (e) => {
    onChange(e.target.value); // Pass the selected date to the parent component
  };

  return (
    <input
      type="date"
      value={value || ''} // Handle undefined values gracefully
      onChange={handleDateChange}
      className="date-picker"
    />
  );
}

export default DateTimePicker;
