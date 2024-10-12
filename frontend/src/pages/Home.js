// src/pages/Home.js
import React from 'react';
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
  const UpcomingInterviewsTable = createTableData(upcomingInterviewsColumns, upcomingInterviewsData);

  return (
    <div className="home">
      <h1>Welcome to NextGenHR Home Page</h1>
      <StatusBubbles />

      {/* Table 1 */}
      <h2>Attention Required</h2>
      <TableComponent columns={attentionRequiredTable.columns} data={attentionRequiredTable.data} />

      {/* Table 2 */}
      <h2>Upcoming Interviews</h2>
      <TableComponent columns={UpcomingInterviewsTable.columns} data={UpcomingInterviewsTable.data} />
    </div>
  );
}

export default Home;
