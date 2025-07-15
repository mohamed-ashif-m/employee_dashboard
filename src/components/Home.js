import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css"; // optional, if you add CSS

const Home = () => {
  return (
    <><div className="welcome-message">
          <h2>Welcome to the Company Dashboard</h2>
          <p>Welcome to our company, where innovation, collaboration, and excellence come together to shape a brighter future! We are thrilled to have you join our vibrant community, dedicated to pushing boundaries and delivering outstanding results. Our team is built on a foundation of diverse talents and shared values, fostering an environment where every idea is valued and every contribution matters. From groundbreaking projects to supportive teamwork, we strive to create a workplace that inspires growth and success for all.</p>
      </div><div className="progress-section">
              <div className="progress-bar-1">
                  <h2 className="head-title">Employee Management</h2>
                  <div className="circular-wrapper">
                      <div
                          className="circular-bar"
                          style={{
                              background: `conic-gradient(#4d5bf9 ${50 * 3.6}deg, #ccc 0deg)`,
                          }}
                      >
                          <div className="inner-circle">
                              <span>{50}%</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="progress-bar-2">
                  <h2 className="head-title">Monthly Progress</h2>
                  <div className="circular-wrapper">
                      <div
                          className="circular-bar"
                          style={{
                              background: `conic-gradient(#4d5bf9 ${75 * 3.6}deg, #f00 0deg)`,
                          }}
                      >
                          <div className="inner-circle">
                              <span>{75}%</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div></>
  );
};

export default Home;
