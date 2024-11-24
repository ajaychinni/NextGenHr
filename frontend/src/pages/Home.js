import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatusBubbles from '../components/StatusBubbles/StatusBubbles';
import TableComponent from '../components/Table/Table';
import Tabs from '../components/Tabs/Tabs';

function Home() {
  const [attentionRequiredData, setAttentionRequiredData] = useState([]);
  const [upcomingInterviewsData, setUpcomingInterviewsData] = useState([]);

  const attentionRequiredColumns = ['Name', 'Date', 'Status', 'Action'];
  const upcomingInterviewsColumns = ['Name', 'Date', 'Job Role', 'Action'];

  // Map column names to keys in API response
  const attentionRequiredKeyMap = {
    Name: 'name',
    Date: 'date',
    Status: 'status',
    Action: '',
  };

  const upcomingInterviewsKeyMap = {
    Name: 'name',
    Date: 'date',
    'Job Role': 'job_role',
    Action: '',
  };

  useEffect(() => {
    // Fetch Attention Required Data
    axios
      .get('http://127.0.0.1:8000/tables/attention-required')
      .then((response) => setAttentionRequiredData(response.data))
      .catch((error) => console.error('Error fetching attention required data:', error));

    // Fetch Upcoming Interviews Data
    axios
      .get('http://127.0.0.1:8000/tables/upcoming-interviews')
      .then((response) => setUpcomingInterviewsData(response.data))
      .catch((error) => console.error('Error fetching upcoming interviews data:', error));
  }, []);

  const tabs = {
    attentionRequired: 'Attention Required',
    upcomingInterviews: 'Upcoming Interviews',
  };

  return (
    <div className="home">
      <StatusBubbles />
      <Tabs tabs={tabs}>
        {{
          attentionRequired: (
            <div>
              <h2>Attention Required</h2>
              <TableComponent
                columns={attentionRequiredColumns}
                data={attentionRequiredData}
                columnKeyMap={attentionRequiredKeyMap}
              />
            </div>
          ),
          upcomingInterviews: (
            <div>
              <h2>Upcoming Interviews</h2>
              <TableComponent
                columns={upcomingInterviewsColumns}
                data={upcomingInterviewsData}
                columnKeyMap={upcomingInterviewsKeyMap}
              />
            </div>
          ),
        }}
      </Tabs>
    </div>
  );
}

export default Home;
