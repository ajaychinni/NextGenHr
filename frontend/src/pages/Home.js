import React, { useState } from 'react';
import StatusBubbles from '../components/StatusBubbles/StatusBubbles';
import TableComponent from '../components/Table/Table';

// Function to generate column names and data
const createTableData = (columns, rows) => {
  return {
    columns,
    data: rows
  };
};

function Home() {
  // State to track which table is currently visible
  const [currentTable, setCurrentTable] = useState('attentionRequired'); // Default to first table

  const attentionRequiredColumns = ['Name', 'Date', 'Status', 'Action'];
  const attentionRequiredData = [
    { name: 'Sagar', date: '29 Sep 2024', status: 'Interview Completed Waiting Feedback' },
    { name: 'Ajay', date: '29 Sep 2024', status: 'Not Responding' }
  ];

  const upcomingInterviewsColumns = ['Name', 'Date', 'Job Role', 'Action'];
  const upcomingInterviewsData = [
    { name: 'Karan', date: '30 Sep 2024', status: 'Block Chain Dev' },
    { name: 'Muskan', date: '01 Oct 2024', status: 'Full stack Dev' }
  ];

  // Create different tables by passing column names and data to the function
  const attentionRequiredTable = createTableData(attentionRequiredColumns, attentionRequiredData);
  const upcomingInterviewsTable = createTableData(upcomingInterviewsColumns, upcomingInterviewsData);

  // Function to toggle between tables
  const handleTableChange = (tableName) => {
    setCurrentTable(tableName);
  };

  return (
    <div className="home">
      <h1>Welcome to NextGenHR Home Page</h1>
      <StatusBubbles />

      {/* Toggle buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button
        style={{ marginRight: '10px' }}
         onClick={() => handleTableChange('attentionRequired')}>
          Attention Required
        </button>
        <button onClick={() => handleTableChange('upcomingInterviews')}>
          Upcoming Interviews
        </button>
      </div>

      {/* Conditionally render the table based on the selected button */}
      {currentTable === 'attentionRequired' && (
        <div>
          <h2>Attention Required</h2>
          <TableComponent columns={attentionRequiredTable.columns} data={attentionRequiredTable.data} />
        </div>
      )}

      {currentTable === 'upcomingInterviews' && (
        <div>
          <h2>Upcoming Interviews</h2>
          <TableComponent columns={upcomingInterviewsTable.columns} data={upcomingInterviewsTable.data} />
        </div>
      )}
    </div>
  );
}

export default Home;
