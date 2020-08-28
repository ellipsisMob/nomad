import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import DeveloperContext from '../../contexts/DeveloperContext';

const Nav = () => {
  const { loggedInDev } = useContext(DeveloperContext);

  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/devs">Developers</Link>
        </li>
        {loggedInDev.loggedIn
          ? (
            <li>
              <Link to="/meetups">Meetups</Link>
            </li>
          )
          : null }
        {loggedInDev.loggedIn
          ? (
            <li>
              <Link to="/addPost">New Post</Link>
            </li>
          )
          : null }
        {loggedInDev.loggedIn
          ? null
          : (
            <li>
              <Link to="/">Stories</Link>
            </li>
          )}
      </ul>
    </div>
  );
};

export default Nav;
