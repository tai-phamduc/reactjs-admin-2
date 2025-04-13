import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OverviewCard = ({ title, value, change, icon, color, background }) => {
  return (
    <div className={`card border-0 shadow-sm bg-${background} px-3 py-3 rounded-4`}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <small className="text-muted fw-semibold">{title}</small>
          <h4 className="fw-bold">{value}</h4>
        </div>
        <div
          className={`icon-box bg-${color}-subtle text-${color} d-flex align-items-center justify-content-center rounded-3`}
        >
          {icon}
        </div>
      </div>
      <div className="text-success small fw-medium">
        ▲ {change}% <span className="text-muted">period of change</span>
      </div>
    </div>
  );
};

const Overview = () => {
  const [overviewData, setOverviewData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/overview')
      .then(response => {
        setOverviewData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="p-4">
      <h6 className="fw-bold text-dark d-flex align-items-center">
        <img src="/src/assets/block-icon.png" alt="" />
        Overview
      </h6>
      <div className="row mt-3 g-3">
        {overviewData.map(item => (
          <div className="col-md-4" key={item.id}>
            <OverviewCard
              title={item.title}
              value={item.value}
              change={item.change}
              icon={<img src={`/src/assets/${item.icon}`} alt="" />}
              color={item.color}
              background={item.background}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
