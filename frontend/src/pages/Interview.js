import React, { useState } from "react";
import "./style/Interview.css";

function Interview() {
  const [buttonText, setButtonText] = useState("Start"); // State for button text

  const handleClick = () => {
    setButtonText(buttonText === "Start" ? "End" : "Start"); // Toggle text
  };

  return (
    <div className="interview-container">
      {/* Top section with text */}
      <div className="header">Some Text</div>

      {/* Middle section (new div) holding the main content */}
      <div className="middle-section">
        {/* Main section: left empty space + right boxes */}
        <div className="main-section">
          <div className="empty-space"></div>
          <div className="right-boxes">
            <div className="box">User</div>
            <div className="box">AI</div>
          </div>
        </div>
      </div>

      {/* Bottom footer with button */}
      <div className="footer">
        <button className="submit-btn" onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Interview;