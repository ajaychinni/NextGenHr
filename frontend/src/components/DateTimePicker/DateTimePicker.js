import React, { useState } from 'react';
import './DateTimePicker.css'

function DateTimePicker() {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <input
      type="datetime-local"
      value={selectedDate}
      onChange={handleDateChange}
    />
  );
}

export default DateTimePicker;
