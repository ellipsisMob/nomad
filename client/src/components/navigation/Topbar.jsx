import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeveloperContext from '../../contexts/DeveloperContext';
import Button from '@material-ui/core/Button';

const Topbar = () => {
  const { loggedInDev, setLoggedInDev } = useContext(DeveloperContext);

  const logoutHandler = () => {
    setLoggedInDev({loggedIn: false});
  }

  return (
    <div className="topbar">
      <div className="top-logo">
        <Link to="/" className="logo">Nomad</Link>
      </div>
      <div className="top-nav">
        <div className="top-search">
          {/* <SearchIcon /> */}
        </div>
        <div className="top-alarm">
          {/* <NotificationsIcon /> */}
        </div>
        <div className="top-profile">
        {loggedInDev.loggedIn
        ? <div>
            <span><strong>{loggedInDev.handle} | </strong></span>
            {/* <AccountCircleIcon /> */}
            <Button onClick={logoutHandler}>Logout</Button>
          </div>
        : <Button><Link to="/login">Sign In</Link></Button>
        }
        </div>
      </div>
    </div>
  )
};

export default Topbar;
