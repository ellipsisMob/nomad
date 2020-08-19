import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Topbar = () => (
  <div className="topbar">
    <div className="top-logo">
      <Link to="/" className="logo">Nomad</Link>
    </div>
    <div className="top-nav">
      <div className="top-search">
        <SearchIcon />
      </div>
      <div className="top-alarm">
        <NotificationsIcon />
      </div>
      <div className="top-profile">
        <AccountCircleIcon />
      </div>
    </div>
  </div>
);

export default Topbar;
