import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => (
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
    </ul>
  </div>
);

export default Nav;
