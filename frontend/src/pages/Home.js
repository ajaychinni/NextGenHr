import React from 'react';
import StatusBubbles from '../components/StatusBubbles/StatusBubbles';
import TableComponent from '../components/Table/Table';
import Tabs from '../components/Tabs/Tabs';

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

  const attentionRequiredTable = createTableData(attentionRequiredColumns, attentionRequiredData);
  const upcomingInterviewsTable = createTableData(upcomingInterviewsColumns, upcomingInterviewsData);

  // Tabs data
  const tabs = {
    attentionRequired: 'Attention Required',
    upcomingInterviews: 'Upcoming Interviews'
  };

  return (
    <div className="home">

      <StatusBubbles />

      <Tabs tabs={tabs}>
        {{
          attentionRequired: (
            <div>
              <h2>Attention Required</h2>
              <TableComponent columns={attentionRequiredTable.columns} data={attentionRequiredTable.data} />
            </div>
          ),
          upcomingInterviews: (
            <div>
              <h2>Upcoming Interviews</h2>
              <TableComponent columns={upcomingInterviewsTable.columns} data={upcomingInterviewsTable.data} />
            </div>
          )
        }}
      </Tabs>
    </div>
  );
}

export default Home;
