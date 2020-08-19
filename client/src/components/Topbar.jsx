import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => (
  <div className="topbar">
    <div className="top-logo">
      <Link path="/" className="logo">Nomad</Link>
    </div>
    <div className="top-nav">
      <p>Search</p>
      <p>Notification</p>
      <p>My profile</p>
    </div>
  </div>
);

export default Topbar;
