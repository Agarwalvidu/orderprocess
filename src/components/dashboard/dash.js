import { useSpring, animated } from "@react-spring/web";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import "./dash.css";

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
  return (
    <div className="flex">
      <Content/>
    </div>
  );
}

function Content() {
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
      <div className="sat-header">
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

function Icon({ path = 'options', className = 'icon-small' }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.svg`}
      alt=""
      className={className}
    />
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


export {Dashboard, Content, NameCard, Graph, TopCountries, Segmentation, Satisfication, AddComponent, Icon, Image};