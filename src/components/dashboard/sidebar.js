import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser,faLeaf, faArrowRotateLeft,faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import "./dash.css";

const Toggle = ({ onSidebarHide }) => {
    return (
      <div className="navbar">
        <IconButton icon={faBars} className="sidebar-toggle" onClick={onSidebarHide} />
      </div>
    );
  };

const sidebarItems = [
    [
      { id: '0', title: 'Dashboard', notifications: false, path:'/' },
      { id: '1', title: 'Inventory', notifications: false, path:'/inventory' },
      { id: '2', title: 'Flags', notifications: 6, path:'/flags' },
      { id: '3', title: 'Returns', notifications: false, path:'/return' },
    ],
    [
      { id: '4', title: 'Add New Inventory', notifications: false ,path:'/add-item'},
      { id: '5', title: 'Sustain', notifications: false,path:'/sustain'}
    ],
  ];

  function Sidebar({ onSidebarHide, showSidebar }) {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('0');
    const { dashOffset, indicatorWidth, precentage } = useSpring({
      dashOffset: 26.015,
      indicatorWidth: 70,
      precentage: 77,
      from: { dashOffset: 113.113, indicatorWidth: 0, precentage: 0 },
      config: config.molasses,
    });
  
    return (
      <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
        <div className="flex-container">
        <div className="sidebar-container">
        <IconButton icon={faUser} className="icon-button" />
        <div className="react-text">
    React
  </div>
  <div className="flex-grow-container"></div>
  <IconButton
    icon={faTimes}
    className="sidebar-close-button"
    onClick={onSidebarHide}
    style={{ color: 'black' }}
  />
  </div>
        </div>
        <div className="sidebar-container-next">
    <div className="sidebar-header">
      <a href="/orders">
      <div className="sidebar-header-content">
        <Icon path="res-react-dash-sidebar-card" className="icon-size" />
        <div className="sidebar-header-text">
          <div className="sidebar-title">Active Orders </div>
        </div>
        <div className="sidebar-grow"></div>
        <Icon
          path="res-react-dash-sidebar-card-select"
          className="icon-small"
        />
      </div>
      </a>
    </div>
  
    {sidebarItems[0].map((i) => (
      <MenuItem
        key={i.id}
        item={i}
        onClick={()=>{
          setSelected(i.id)
          navigate(i.path)
        }}
        selected={selected}
      />
    ))}
  
    {sidebarItems[1].map((i) => (
      <MenuItem
        key={i.id}
        item={i}
        onClick={()=>{
          setSelected(i.id)
          navigate(i.path)
        }}
        selected={selected}
      />
    ))}
  
    <div className="sidebar-grow"></div>
  
    <div className="sidebar-footer">
      <div className="sidebar-footer-content">
        <div
          className="sidebar-background"
          style={{
            backgroundImage: "url('https://assets.codepen.io/3685267/res-react-dash-usage-card.svg')",
          }}
        >
          <div className="sidebar-footer-text">
            <div className="sidebar-footer-title">Used Space</div>
            <div className="sidebar-footer-subtitle">
              Admin updated 09:12 am November 08,2020
            </div>
            <animated.div className="sidebar-footer-percentage">
              {precentage.interpolate((i) => `${Math.round(i)}%`)}
            </animated.div>
            <div className="sidebar-footer-line">
              <svg
                viewBox="0 0 100 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="5"
                  y1="5.25"
                  x2="95"
                  y2="5.25"
                  stroke="#3C3C3C"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <animated.line
                  x1="5"
                  y1="5.25"
                  x2={indicatorWidth}
                  y2="5.25"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
  
          <div className="sidebar-footer-mobile">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" fill="#2C2C2D" />
              <path
                d="M 28 28 m 0, -18 a 18 18 0 0 1 0 36 a 18 18 0 0 1 0 -36"
                stroke="#3C3C3C"
                strokeWidth="6"
              />
              <animated.path
                d="M 28 28 m 0, -18 a 18 18 0 0 1 0 36 a 18 18 0 0 1 0 -36"
                stroke="#fff"
                strokeLinecap="round"
                strokeDasharray="113.113"
                strokeDashoffset={dashOffset}
                strokeWidth="6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
  <div className="sidebar-item-container">
    <div className="sidebar-item-content">
      <Image path="mock_faces_8" className="image-size" />
      <div className="sidebar-item-text">
         Clark Kent
      </div>
      <div className="sidebar-item-grow"></div>
      <Icon
        path="res-react-dash-options"
        className="icon-small"
      />
    </div>
  </div>
  
      </div>
    );
  }
  function MenuItem({ item: { id, title, notifications }, onClick, selected }) { 
    return (
      <div
        className={`menu-item ${selected === id ? 'menu-item-selected' : ''}`}
        onClick={() => onClick(id)}
      >
        <SidebarIcons id={id} />
        <div className="menu-title">{title}</div>
        <div className="menu-spacer"></div>
        {notifications && (
          <div className="menu-notification">
            <div className="menu-notification-text">{notifications}</div>
          </div>
        )}
      </div>
    );
  }
  function SidebarIcons({ id }) {
    const icons = {
      0: (
        <>
          <path  className="icon" d="M12 19C10.067 19 8.31704 18.2165 7.05029 16.9498L12 12V5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19Z" />
          <path
          className="icon"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          />
        </>
      ),
      1: (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 5C3 3.34315 4.34315 2 6 2H14C17.866 2 21 5.13401 21 9V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V5ZM13 4H6C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V9H13V4ZM18.584 7C17.9413 5.52906 16.6113 4.4271 15 4.10002V7H18.584Z"
          />
        </>
      ),
      2: (
        <>
          <path d="M21.266 20.998H2.73301C2.37575 20.998 2.04563 20.8074 1.867 20.498C1.68837 20.1886 1.68838 19.8074 1.86701 19.498L11.133 3.49799C11.3118 3.1891 11.6416 2.9989 11.9985 2.9989C12.3554 2.9989 12.6852 3.1891 12.864 3.49799L22.13 19.498C22.3085 19.8072 22.3086 20.1882 22.1303 20.4975C21.9519 20.8069 21.6221 20.9976 21.265 20.998H21.266ZM12 5.99799L4.46901 18.998H19.533L12 5.99799ZM12.995 14.999H10.995V9.99799H12.995V14.999Z" />
          <path d="M11 16H13V18H11V16Z" />
        </>
      ),
      3: (
        <>
          
          <FontAwesomeIcon icon={faArrowRotateLeft} style={{color: "#676767"}} />
        </>
      ),
      4: (
        <>
          <FontAwesomeIcon icon={faFileCirclePlus} style={{color: "#676767",}} />
        </>
      ),
      5: (
        <>
          <FontAwesomeIcon icon={faLeaf} style={{color: "#676767"}} />
        </>
      )
    };
    return (
      <svg
        className="sidebar-icon-image"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {icons[id]}
      </svg>
    );
  }
  function Icon({ path = 'options', className = 'icon-small' }) {
    return (
      <img
        src={`https://assets.codepen.io/3685267/${path}.svg`}
        alt=""
        className={className}
      />
    );
  }
  
  function IconButton({ onClick = () => {}, icon = faBars, className = 'icon-button' }) {
    return (
      <button onClick={onClick} type="button" className={className} style={{color: "white"}}>
        <FontAwesomeIcon icon={icon} className="icon-image" />
      </button>
    );
  }
function Image({ path = '1', className = 'image-small' }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.jpg`}
      alt=""
      className={className}
    />
  );
}
  export {Sidebar, SidebarIcons, MenuItem, Icon, IconButton, Image, Toggle};