// src/components/Layout.js
import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './dash.css';

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar onSidebarHide={() => setShowSidebar(false)} showSidebar={showSidebar} />

      {/* Main Content */}
      <div className="toggle-div">
        {/* Toggle Button (Visible in mobile view) */}
        <button className="sidebar-toggle" onClick={() => setShowSidebar(true)}>
          <FontAwesomeIcon icon={faBars} style={{marginLeft: "93%", marginTop: "10px"}}/>
        </button>

        {/* Render the Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
