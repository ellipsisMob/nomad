import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import DeveloperContext from '../../contexts/DeveloperContext';

const Nav = () => {
  const { loggedInDev } = useContext(DeveloperContext);
  useEffect(() => {
    console.log('coming from the nav component',loggedInDev);
  },[loggedInDev]) 
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/devs">Our Developers</Link>
        </li>
        <li>
          <Link to="/addPost">New Post</Link>
        </li>
        <li>
          <Link to="/meetups">Meetups</Link>
        </li>
        {loggedInDev.loggedIn
        ? null
        : <li>
            <Link to="/login">Sign In</Link>
          </li>
        }
       
      </ul>
    </div>
  )
};

export default Nav;
