import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import "./dash.css";

// const map = (value, sMin, sMax, dMin, dMax) => {
//   return dMin + ((value - sMin) / (sMax - sMin)) * (dMax - dMin);
// };
// const pi = Math.PI;

const employeeData = [
  {
    id: 1,
    name: 'Esther Howard',
    position: "Sale's manager USA",
    transactions: 3490,
    rise: true,
    tasksCompleted: 3,
    imgId: 0,
  },

  {
    id: 2,
    name: 'Eleanor Pena',
    position: "Sale's manager Europe",
    transactions: 590,
    rise: false,
    tasksCompleted: 5,
    imgId: 2,
  },

  {
    id: 3,
    name: 'Robert Fox',
    position: "Sale's manager Asia",
    transactions: 2600,
    rise: true,
    tasksCompleted: 1,
    imgId: 3,
  },
];

const Countrydata = [
  { name: 'USA', rise: true, value: 21942.83, id: 1 },
  { name: 'Ireland', rise: false, value: 19710.0, id: 2 },
  { name: 'Ukraine', rise: false, value: 12320.3, id: 3 },
  { name: 'Sweden', rise: true, value: 9725.0, id: 4 },
];
const segmentationData = [
  { c1: 'Not Specified', c2: '800', c3: '#363636', color: '#535353' },
  { c1: 'Male', c2: '441', c3: '#818bb1', color: '#595f77' },
  { c1: 'Female', c2: '233', c3: '#2c365d', color: '#232942' },
  { c1: 'Other', c2: '126', c3: '#334ed8', color: '#2c3051' },
];

const sidebarItems = [
  [
    { id: '0', title: 'Dashboard', notifications: false },
    { id: '1', title: 'Inventory', notifications: false },
    { id: '2', title: 'Flags', notifications: 6 },
    { id: '3', title: 'Team', notifications: false },
  ],
  [
    { id: '4', title: 'Tasks', notifications: false },
    { id: '5', title: 'Reports', notifications: false },
    { id: '6', title: 'Settings', notifications: false },
  ],
];

const graphData = [
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
].map((i) => {
  const revenue = 500 + Math.random() * 2000;
  const expectedRevenue = Math.max(revenue + (Math.random() - 0.5) * 2000, 0);
  return {
    name: i,
    revenue,
    expectedRevenue,
    sales: Math.floor(Math.random() * 500),
  };
});

const Dashboard = () => {
  const [showSidebar, onSetShowSidebar] = useState(true);
  return (
    <div className="flex">
      <Sidebar
        onSidebarHide={() => {
          onSetShowSidebar(false);
        }}
        showSidebar={showSidebar}
      />
      <Content
        onSidebarHide={() => {
          onSetShowSidebar(true);
        }}
      />
    </div>
  );
}

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
/>
</div>
      </div>
      <div className="sidebar-container-next">
  <div className="sidebar-header">
    <div className="sidebar-header-content">
      <Icon path="res-react-dash-sidebar-card" className="icon-size" />
      <div className="sidebar-header-text">
        <div className="sidebar-title">Sales House</div>
        <div className="sidebar-subtitle">General Item</div>
      </div>
      <div className="sidebar-grow"></div>
      <Icon
        path="res-react-dash-sidebar-card-select"
        className="icon-small"
      />
    </div>
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
  
  <div className="sidebar-shortcuts-title">SHORTCUTS</div>

  {sidebarItems[1].map((i) => (
    <MenuItem
      key={i.id}
      item={i}
      onClick={setSelected}
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
      Jerry Wilson
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

function Content({ onSidebarHide }) {
  return (
    <div className="content-container">
      <div className="sidebar-placeholder">.</div>
      <div className="main-content">
        <div className="header">
          <div className="header-content">
            <div className="header-left">
              <div className="header-title">
                <div className="title-text">Hello David</div>
                <div className="premium-badge">
                  <Icon path="res-react-dash-premium-star" />
                  <div className="premium-text">PREMIUM</div>
                </div>
              </div>
              <div className="date-info">
                <Icon path="res-react-dash-date-indicator" className="icon-small" />
                <div className="date-text">October 26</div>
              </div>
            </div>
            <IconButton
              icon={faBars}
              className="sidebar-toggle"
              onClick={onSidebarHide}
            />
          </div>
          <div className="search-container">
            <Icon path="res-react-dash-search" className="search-icon" />
            <form action="#" method="POST">
              <input
                type="text"
                name="company_website"
                id="company_website"
                className="search-input"
                placeholder="search"
              />
            </form>
          </div>
        </div>
        {employeeData.map(({ id, name, position, transactions, rise, tasksCompleted, imgId }) => (
          <NameCard
            key={id}
            id={id}
            name={name}
            position={position}
            transactionAmount={transactions}
            rise={rise}
            tasksCompleted={tasksCompleted}
            imgId={imgId}
          />
        ))}

        <div className="graph-container">
          <div className="graph-card">
            <Graph />
          </div>
        </div>

        <div className="top-countries-container">
          <div className="top-countries-card">
            <TopCountries />
          </div>
        </div>

        <div className="segmentation-container">
          <div className="segmentation-card-out">
            <Segmentation />
          </div>
        </div>

        <div className="satisfaction-container" style={{paddingTop: "16px"}}>
          <div className="satisfaction-card">
            <Satisfication />
          </div>
        </div>

        <div className="add-component-container-out" style={{paddingTop:"16px", marginLeft:"16px", width:"30.33%"}}>
          <div className="add-component-card-out" >
            <AddComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

function NameCard({ name, position, transactionAmount, rise, tasksCompleted, imgId }) {
  const { transactions, barPlayhead } = useSpring({
    transactions: transactionAmount,
    barPlayhead: 1,
    from: { transactions: 0, barPlayhead: 0 },
  });

  return (
    <div className="name-card-container">
      <div className="name-card">
        <div className="name-card-left">
          <div className="name-card-header">
            <Image path={`mock_faces_${imgId}`} className="profile-img" />
            <div className="name-info">
              <div className="name-title">
                <div className="name-text">{name}</div>
                <Icon path="res-react-dash-tick" />
              </div>
              <div className="position">{position}</div>
            </div>
          </div>

          <div className="tasks-completed">{`${tasksCompleted} from 5 tasks completed`}</div>
          <svg
            className="progress-bar"
            height="6"
            viewBox="0 0 200 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="200" height="6" rx="3" fill="#2D2D2D" />
            <animated.rect
              width={barPlayhead.interpolate((i) => i * (tasksCompleted / 5) * 200)}
              height="6"
              rx="3"
              fill="url(#paint0_linear)"
            />
            <rect x="38" width="2" height="6" fill="#171717" />
            <rect x="78" width="2" height="6" fill="#171717" />
            <rect x="118" width="2" height="6" fill="#171717" />
            <rect x="158" width="2" height="6" fill="#171717" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#8E76EF" />
                <stop offset="1" stopColor="#3912D2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="name-card-right">
          <Icon path={rise ? 'res-react-dash-bull' : 'res-react-dash-bear'} className="status-icon" />
          <animated.div className={`transaction-amount ${rise ? 'text-green' : 'text-red'}`}>
            {transactions.interpolate((i) => `$${i.toFixed(2)}`)}
          </animated.div>
          <div className="last-6-month">Last 6 months</div>
        </div>
      </div>
    </div>
  );
}

function Graph() {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Access the data point
      return (
        <div className="tooltip-container">
          <div className="tooltip-header">
            <div>Revenue</div>
            <Icon path="res-react-dash-options" className="icon-small" />
          </div>
          <div className="tooltip-body">
            <div className="tooltip-value">${data.revenue.toFixed(2)}</div>
            <div>Revenue from {data.sales} sales</div>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="graph-container" style={{width:"96%"}}>
      <div className="graph-header">
        <div className="graph-title">Your Work Summary</div>
        <div className="graph-spacer" />
        <Icon path="res-react-dash-graph-range" className="icon-medium" />
        <div className="graph-range">Last 9 Months</div>
        <div className="tooltip-icon">?</div>
      </div>
      <div className="graph-subtitle">Nov - July</div>

      <div className="graph-body" style={{ height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={graphData}>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#6B8DE3" />
                <stop offset="1" stopColor="#7D1C8D" />
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={false} strokeWidth="6" stroke="#252525" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line activeDot={false} type="monotone" dataKey="expectedRevenue" stroke="#242424" strokeWidth="3" dot={false} strokeDasharray="8 8" />
            <Line type="monotone" dataKey="revenue" stroke="url(#paint0_linear)" strokeWidth="4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TopCountries() {
  return (
    <div className="top-countries-container" style={{width:"95%"}}>
      <div className="top-countries-header">
        <div className="title">Top Countries</div>
        <Icon path="res-react-dash-plus" className="icon-medium" />
      </div>
      <div className="favorites">favourites</div>
      {Countrydata.map(({ name, rise, value, id }) => (
        <div className="country-item" key={id}>
          <div className="country-id">{id}</div>
          <Image path={`res-react-dash-flag-${id}`} className="country-flag" />
          <div className="country-name">{name}</div>
          <div className="spacer" />
          <div className="country-value">{`$${value.toLocaleString()}`}</div>
          <Icon
            path={rise ? 'res-react-dash-country-up' : 'res-react-dash-country-down'}
            className="icon-small"
          />
          <Icon path="res-react-dash-options" className="icon-xsmall" />
        </div>
      ))}
      <div className="spacer" />
      <div className="check-all-container">
        <div>Check All</div>
      </div>
    </div>
  );
}

function Segmentation() {
  return (
    <div className="segmentation-container" style={{width:"92%"}}>
      <div className="segmentation-header">
        <div className="segmentation-title">Segmentation</div>
        <Icon path="res-react-dash-options" className="icon-small" />
      </div>

      <div className="segmentation-subtitle">All users</div>

      {segmentationData.map(({ c1, c2, c3, color }) => (
        <div className="segmentation-item" key={c1}>
          <div
            className="segmentation-dot"
            style={{ background: color }}
          />
          <div className="segmentation-text" style={{ color }}>
            {c1}
          </div>
          <div className="segmentation-flex-grow" />
          <div className="segmentation-percentage" style={{ color }}>
            {c2}
          </div>
          <div className="segmentation-border" />
          <div className="segmentation-card">
            <div
              className="segmentation-card-bg"
              style={{ background: c3 }}
            >
              {c1 === 'Other' && (
                <img
                  src="https://assets.codepen.io/3685267/res-react-dash-user-card.svg"
                  alt=""
                  className="segmentation-image"
                />
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="segmentation-details">
        <div>Details</div>
        <Icon path="res-react-dash-chevron-right" className="icon-medium" />
      </div>
    </div>
  );
}

function Satisfication() {
  // const { dashOffset } = useSpring({
  //   dashOffset: 78.54,
  //   from: { dashOffset: 785.4 },
  //   config: config.molasses,
  // });

  return (
    <div className="satisfication-container">
      <div className="header">
        <div className="title">Satisfaction</div>
        <Icon path="res-react-dash-options" className="icon-small" />
      </div>

      <div className="sub-title">From all projects</div>

      <div className="svg-wrapper">
        <svg viewBox="0 0 700 380" fill="none" width="300" xmlns="http://www.w3.org/2000/svg" id="svg"><path d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350" stroke="#2d2d2d" stroke-width="40" stroke-linecap="round"></path><path d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350" stroke="#2f49d0" stroke-width="40" stroke-linecap="round" stroke-dasharray="785.4" stroke-dashoffset="78.54" id="svgPath" class="svgPath"></path><circle cx="587.7641290737884" cy="272.7457514062631" r="12" fill="#fff"></circle><circle cx="140" cy="350" r="5" fill="#2f49d0"></circle><circle cx="144.5890038459008" cy="306.3385449282706" r="5" fill="#2f49d0"></circle><circle cx="158.15545389505382" cy="264.58530495408195" r="5" fill="#2f49d0"></circle><circle cx="180.10643118126103" cy="226.56509701858067" r="5" fill="#2f49d0"></circle><circle cx="209.48257266463972" cy="193.93958664974724" r="5" fill="#2f49d0"></circle><circle cx="244.9999999999999" cy="168.1346652052679" r="5" fill="#2f49d0"></circle><circle cx="285.10643118126103" cy="150.27813157801776" r="5" fill="#2f49d0"></circle><circle cx="328.0490227137926" cy="141.15040197266262" r="5" fill="#2f49d0"></circle><circle cx="371.95097728620715" cy="141.1504019726626" r="5" fill="#2f49d0"></circle><circle cx="414.8935688187389" cy="150.27813157801774" r="5" fill="#2f49d0"></circle><circle cx="454.9999999999999" cy="168.1346652052678" r="5" fill="#2f49d0"></circle><circle cx="490.51742733536014" cy="193.93958664974713" r="5" fill="#2f49d0"></circle><circle cx="519.8935688187389" cy="226.5650970185806" r="5" fill="#2f49d0"></circle><circle cx="541.8445461049462" cy="264.58530495408183" r="5" fill="#2f49d0"></circle><circle cx="555.4109961540992" cy="306.33854492827044" r="5" fill="#2f49d0"></circle><circle cx="560" cy="349.99999999999994" r="5" fill="#2f49d0"></circle><path d="M349.292 375C395.845 375 433.583 337.261 433.583 290.708C433.583 244.155 395.845 206.417 349.292 206.417C302.739 206.417 265 244.155 265 290.708C265 337.261 302.739 375 349.292 375Z" fill="white"></path><path d="M349.292 358.708C386.847 358.708 417.292 328.264 417.292 290.708C417.292 253.153 386.847 222.708 349.292 222.708C311.736 222.708 281.292 253.153 281.292 290.708C281.292 328.264 311.736 358.708 349.292 358.708Z" fill="#D2D6E7"></path><path d="M347.167 343.833C376.898 343.833 401 319.731 401 290C401 260.269 376.898 236.167 347.167 236.167C317.435 236.167 293.333 260.269 293.333 290C293.333 319.731 317.435 343.833 347.167 343.833Z" fill="#FFE17D"></path><path d="M347.167 316.482C339.696 316.482 332.608 313.623 328.204 308.835C327.391 307.953 327.449 306.58 328.331 305.768C329.213 304.956 330.588 305.013 331.399 305.896C334.996 309.807 340.89 312.141 347.167 312.141C353.443 312.141 359.338 309.807 362.935 305.896C363.745 305.013 365.121 304.956 366.003 305.768C366.885 306.58 366.942 307.953 366.13 308.835C361.725 313.623 354.637 316.482 347.167 316.482Z" fill="#AA7346"></path><path d="M328.933 290C326.535 290 324.592 288.056 324.592 285.659V282.186C324.592 279.788 326.535 277.844 328.933 277.844C331.33 277.844 333.274 279.788 333.274 282.186V285.659C333.274 288.056 331.33 290 328.933 290Z" fill="#7D5046"></path><path d="M328.933 277.844C328.635 277.844 328.345 277.875 328.064 277.932V283.922C328.064 285.361 329.231 286.527 330.669 286.527C332.108 286.527 333.274 285.361 333.274 283.922V282.186C333.274 279.788 331.331 277.844 328.933 277.844Z" fill="#9C6846"></path><path d="M365.401 290C363.003 290 361.059 288.056 361.059 285.659V282.186C361.059 279.788 363.003 277.844 365.401 277.844C367.798 277.844 369.742 279.788 369.742 282.186V285.659C369.742 288.056 367.798 290 365.401 290Z" fill="#7D5046"></path><path d="M365.401 277.844C365.103 277.844 364.813 277.875 364.532 277.932V283.922C364.532 285.361 365.699 286.527 367.137 286.527C368.576 286.527 369.742 285.361 369.742 283.922V282.186C369.742 279.788 367.798 277.844 365.401 277.844Z" fill="#9C6846"></path><path d="M354.981 336.019C325.25 336.019 301.148 311.917 301.148 282.186C301.148 269.31 305.673 257.496 313.213 248.232C301.085 258.103 293.333 273.144 293.333 290C293.333 319.731 317.435 343.833 347.167 343.833C364.023 343.833 379.064 336.081 388.935 323.953C379.671 331.493 367.857 336.019 354.981 336.019Z" fill="#FFD164"></path></svg>
      </div>

      <div className="stats-wrapper">
        <div className="stats-container">
          <div className="stat-left">0%</div>
          <div className="stat-middle">
            <div className="stat-percentage">97.78%</div>
            <div className="stat-label">Based on Likes</div>
          </div>
          <div className="stat-right">100%</div>
        </div>
      </div>
    </div>
  );
}

function AddComponent() {
  return (
    <div>
      <div className="add-component-head"></div>
      <div className="add-component-container">
        <div className="add-component-icon">
          <img
            src="https://assets.codepen.io/3685267/res-react-dash-rocket.svg"
            alt=""
            className="full-size"
          />
        </div>
        <div className="component-text">No Components Created Yet</div>
        <div className="sub-text">Simply create your first component</div>
        <div className="sub-text">Just click on the button</div>
        <div className="add-button">
          <Icon path="res-react-dash-add-component" className="icon-small" />
          <div className="button-text">Add Component</div>
          <div className="badge">129</div>
        </div>
      </div>
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
        <path d="M9 3C6.23858 3 4 5.23858 4 8C4 10.7614 6.23858 13 9 13C11.7614 13 14 10.7614 14 8C14 5.23858 11.7614 3 9 3ZM6 8C6 6.34315 7.34315 5 9 5C10.6569 5 12 6.34315 12 8C12 9.65685 10.6569 11 9 11C7.34315 11 6 9.65685 6 8Z" />
        <path d="M16.9084 8.21828C16.6271 8.07484 16.3158 8.00006 16 8.00006V6.00006C16.6316 6.00006 17.2542 6.14956 17.8169 6.43645C17.8789 6.46805 17.9399 6.50121 18 6.5359C18.4854 6.81614 18.9072 7.19569 19.2373 7.65055C19.6083 8.16172 19.8529 8.75347 19.9512 9.37737C20.0496 10.0013 19.9987 10.6396 19.8029 11.2401C19.6071 11.8405 19.2719 12.3861 18.8247 12.8321C18.3775 13.2782 17.8311 13.6119 17.2301 13.8062C16.6953 13.979 16.1308 14.037 15.5735 13.9772C15.5046 13.9698 15.4357 13.9606 15.367 13.9496C14.7438 13.8497 14.1531 13.6038 13.6431 13.2319L13.6421 13.2311L14.821 11.6156C15.0761 11.8017 15.3717 11.9248 15.6835 11.9747C15.9953 12.0247 16.3145 12.0001 16.615 11.903C16.9155 11.8059 17.1887 11.639 17.4123 11.416C17.6359 11.193 17.8035 10.9202 17.9014 10.62C17.9993 10.3198 18.0247 10.0006 17.9756 9.68869C17.9264 9.37675 17.8041 9.08089 17.6186 8.82531C17.4331 8.56974 17.1898 8.36172 16.9084 8.21828Z" />
        <path d="M19.9981 21C19.9981 20.475 19.8947 19.9551 19.6938 19.47C19.4928 18.9849 19.1983 18.5442 18.8271 18.1729C18.4558 17.8017 18.0151 17.5072 17.53 17.3062C17.0449 17.1053 16.525 17.0019 16 17.0019V15C16.6821 15 17.3584 15.1163 18 15.3431C18.0996 15.3783 18.1983 15.4162 18.2961 15.4567C19.0241 15.7583 19.6855 16.2002 20.2426 16.7574C20.7998 17.3145 21.2417 17.9759 21.5433 18.7039C21.5838 18.8017 21.6217 18.9004 21.6569 19C21.8837 19.6416 22 20.3179 22 21H19.9981Z" />
        <path d="M16 21H14C14 18.2386 11.7614 16 9 16C6.23858 16 4 18.2386 4 21H2C2 17.134 5.13401 14 9 14C12.866 14 16 17.134 16 21Z" />
      </>
    ),
    4: (
      <>
        <path d="M19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4H7V2H9V4H15V2H17V4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22ZM5 10V20H19V10H5ZM5 6V8H19V6H5ZM17 14H7V12H17V14Z" />
      </>
    ),
    5: (
      <>
        <path d="M21.266 20.998H2.73301C2.37575 20.998 2.04563 20.8074 1.867 20.498C1.68837 20.1886 1.68838 19.8074 1.86701 19.498L11.133 3.49799C11.3118 3.1891 11.6416 2.9989 11.9985 2.9989C12.3554 2.9989 12.6852 3.1891 12.864 3.49799L22.13 19.498C22.3085 19.8072 22.3086 20.1882 22.1303 20.4975C21.9519 20.8069 21.6221 20.9976 21.265 20.998H21.266ZM12 5.99799L4.46901 18.998H19.533L12 5.99799ZM12.995 14.999H10.995V9.99799H12.995V14.999Z" />
        <path d="M11 16H13V18H11V16Z" />
      </>
    ),
    6: (
      <>
        <path d="M13.82 22H10.18C9.71016 22 9.3036 21.673 9.20304 21.214L8.79604 19.33C8.25309 19.0921 7.73827 18.7946 7.26104 18.443L5.42404 19.028C4.97604 19.1709 4.48903 18.9823 4.25404 18.575L2.43004 15.424C2.19763 15.0165 2.2777 14.5025 2.62304 14.185L4.04804 12.885C3.98324 12.2961 3.98324 11.7019 4.04804 11.113L2.62304 9.816C2.27719 9.49837 2.19709 8.98372 2.43004 8.576L4.25004 5.423C4.48503 5.0157 4.97204 4.82714 5.42004 4.97L7.25704 5.555C7.5011 5.37416 7.75517 5.20722 8.01804 5.055C8.27038 4.91269 8.53008 4.78385 8.79604 4.669L9.20404 2.787C9.30411 2.32797 9.71023 2.00049 10.18 2H13.82C14.2899 2.00049 14.696 2.32797 14.796 2.787L15.208 4.67C15.4888 4.79352 15.7623 4.93308 16.027 5.088C16.274 5.23081 16.5127 5.38739 16.742 5.557L18.58 4.972C19.0277 4.82967 19.5142 5.01816 19.749 5.425L21.569 8.578C21.8015 8.98548 21.7214 9.49951 21.376 9.817L19.951 11.117C20.0158 11.7059 20.0158 12.3001 19.951 12.889L21.376 14.189C21.7214 14.5065 21.8015 15.0205 21.569 15.428L19.749 18.581C19.5142 18.9878 19.0277 19.1763 18.58 19.034L16.742 18.449C16.5095 18.6203 16.2678 18.7789 16.018 18.924C15.7559 19.0759 15.4854 19.2131 15.208 19.335L14.796 21.214C14.6956 21.6726 14.2895 21.9996 13.82 22ZM7.62004 16.229L8.44004 16.829C8.62489 16.9652 8.81755 17.0904 9.01704 17.204C9.20474 17.3127 9.39801 17.4115 9.59604 17.5L10.529 17.909L10.986 20H13.016L13.473 17.908L14.406 17.499C14.8133 17.3194 15.1999 17.0961 15.559 16.833L16.38 16.233L18.421 16.883L19.436 15.125L17.853 13.682L17.965 12.67C18.0142 12.2274 18.0142 11.7806 17.965 11.338L17.853 10.326L19.437 8.88L18.421 7.121L16.38 7.771L15.559 7.171C15.1998 6.90671 14.8133 6.68175 14.406 6.5L13.473 6.091L13.016 4H10.986L10.527 6.092L9.59604 6.5C9.39785 6.58704 9.20456 6.68486 9.01704 6.793C8.81878 6.90633 8.62713 7.03086 8.44304 7.166L7.62204 7.766L5.58204 7.116L4.56504 8.88L6.14804 10.321L6.03604 11.334C5.98684 11.7766 5.98684 12.2234 6.03604 12.666L6.14804 13.678L4.56504 15.121L5.58004 16.879L7.62004 16.229ZM11.996 16C9.7869 16 7.99604 14.2091 7.99604 12C7.99604 9.79086 9.7869 8 11.996 8C14.2052 8 15.996 9.79086 15.996 12C15.9933 14.208 14.204 15.9972 11.996 16ZM11.996 10C10.9034 10.0011 10.0139 10.8788 9.99827 11.9713C9.98262 13.0638 10.8466 13.9667 11.9387 13.9991C13.0309 14.0315 13.9469 13.1815 13.996 12.09V12.49V12C13.996 10.8954 13.1006 10 11.996 10Z" />
      </>
    ),
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


export {Dashboard, Sidebar, SidebarIcons, MenuItem, Content, NameCard, Graph, TopCountries, Segmentation, Satisfication, AddComponent, Icon, IconButton, Image};