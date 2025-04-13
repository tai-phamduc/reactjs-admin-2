import React from 'react';
import { BsCart3, BsCurrencyDollar, BsPersonPlus } from 'react-icons/bs';

const OverviewCard = ({ title, value, change, icon, color }) => {
  return (
    <div className={`card border-0 shadow-sm bg-light bg-${color} px-3 py-3 rounded-4`}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <small className="text-muted fw-semibold">{title}</small>
          <h4 className="fw-bold">{value}</h4>
        </div>
        <div
          className={`icon-box bg-${color}-subtle text-${color} d-flex align-items-center justify-content-center rounded-3`}
          style={{ width: '30px', height: '30px' }}
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
  return (
    <div className="p-4">
      <h6 className="fw-bold text-dark d-flex align-items-center">
        <span className="text-pink me-2">▣</span> Overview
      </h6>
      <div className="row mt-3 g-3">
        <div className="col-md-4">
          <OverviewCard
            title="Turnover"
            value="$92,405"
            change="5.36"
            icon={<BsCart3 />}
            color="pink"
          />
        </div>
        <div className="col-md-4">
          <OverviewCard
            title="Profit"
            value="$32,218"
            change="5.93"
            icon={<BsCurrencyDollar />}
            color="primary"
          />
        </div>
        <div className="col-md-4">
          <OverviewCard
            title="New customer"
            value="298"
            change="6.84"
            icon={<BsPersonPlus />}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
