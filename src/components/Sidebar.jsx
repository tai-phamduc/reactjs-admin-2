import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', to: '/', icon: '/src/assets/block-icon.png' },
    { label: 'Projects', to: '/projects', icon: '/src/assets/folder-icon.png' },
    { label: 'Teams', to: '/teams', icon: '/src/assets/group-icon.png' },
    { label: 'Analytics', to: '/analytics', icon: '/src/assets/pie-chart-icon.png' },
    { label: 'Messages', to: '/messages', icon: '/src/assets/chat-icon.png' },
    { label: 'Integrations', to: '/integrations', icon: '/src/assets/code-icon.png' },
  ];

  return (
    <div className="d-flex flex-column p-3 gap-4" style={{ width: '220px', height: '100vh' }}>
      <div>
        <img className='w-50' src="/src/assets/logo.png" alt="" />
      </div>
      <ul className="nav nav-pills flex-column mb-auto">
        {navItems.map(({ label, to, icon }) => (
          <li className="nav-item" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                'nav-link d-flex align-items-center gap-2 ' + (isActive ? 'active bg-primary text-white' : 'text-black-50')
              }
            >
              <img src={`${icon}`} alt="" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className='py-3 d-flex flex-column align-items-center gap-3 bg-light'>
        <img className='w-100' src="/src/assets/group-image.png" alt="" />
        <div className='fs-5 fw-bold'>V2.0 is available</div>
        <button className="btn btn-light px-5 border-secondary">Try now</button>
      </div>
    </div>
  );
};

export default Sidebar;
