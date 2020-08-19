import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './Nav.css';

const Nav = () => (
  <div className="navbar">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Our devs</Link>
      </li>
    </ul>
  </div>
);

export default Nav;
