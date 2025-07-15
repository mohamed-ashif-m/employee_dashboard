import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ setActivePage, showSidebar, toggleSidebar }) => {
  return (
    <>
      {/* Hamburger icon for mobile */}
      <div className="hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>

      <div className={`sidebar ${showSidebar ? "show" : ""}`}>
        <h2>Company</h2>
        <button onClick={() => { setActivePage("home"); toggleSidebar(); }}>Home</button>
        <button onClick={() => { setActivePage("employee"); toggleSidebar(); }}>Employees</button>
        <button>About Us</button>
        <button>Testimonials</button>
        <button>Services</button>
        <button>Contact Us</button>
      </div>
    </>
  );
};

export default Sidebar;
