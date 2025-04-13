import React from 'react';

const TopNavbar = () => {
  return (
    <div className="container pb-3 border-bottom border-light d-flex justify-content-between align-items-center bg-white">
      {/* Left - Title */}
      <div>
        <h5 className="fs-3 fw-bold text-primary mb-0">Dashboard</h5>
      </div>

      {/* Right - Search + Icons */}
      <div className="d-flex align-items-center gap-3">
        {/* Search box */}
        <div className="input-group rounded bg-light px-2">
          <span className="input-group-text bg-transparent border-0">
            <img src="/src/assets/search-icon.png" alt="" />
          </span>
          <input
            type="text"
            className="form-control border-0 bg-transparent"
            placeholder="Search..."
          />
        </div>

        {/* Icons */}
        <img src="src/assets/bell-icon.png" alt="" />
        <img src="src/assets/question-mark-icon.png" alt="" />

        {/* Avatar */}
        <img
          src="src/assets/avatar.png"
          alt="User"
          className="rounded-circle"
          style={{ width: '32px', height: '32px' }}
        />
      </div>
    </div>
  );
};

export default TopNavbar;
