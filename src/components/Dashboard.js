import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";
import EmployeeTable from "./EmployeeTable";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("home");
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="dashboard">
      <Sidebar
        setActivePage={setActivePage}
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
      />
      <div className="main-content">
        <h1>Company Dashboard</h1>
        {activePage === "home" && <Home />}
        {activePage === "employee" && <EmployeeTable />}
      </div>
    </div>
  );
};

export default Dashboard;
