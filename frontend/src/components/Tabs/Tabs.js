import React, { useState } from 'react';
import './Tabs.css'; // Import the CSS file

function Tabs({ tabs, children }) {
  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0]); // Default to first tab

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      {/* Tab buttons */}
      <div className="tabs-container">
        {Object.keys(tabs).map((tabName) => (
          <button
            key={tabName}
            className={activeTab === tabName ? 'active' : ''}
            onClick={() => handleTabChange(tabName)}
          >
            {tabs[tabName]}
          </button>
        ))}
      </div>

      {/* Tab content with fade effect */}
      <div className="tab-content-container">
        {Object.keys(children).map((tabName) => (
          <div
            key={tabName}
            className={`tab-content ${activeTab === tabName ? 'show' : 'hidden'}`}
          >
            {children[tabName]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
