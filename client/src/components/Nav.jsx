import React from 'react';
import {
  Link,
  Switch,
  Route,
} from 'react-router-dom';
import PostList from './PostList';
import Users from './Users';

const Nav = () => (

  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Posts</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route path="/">
        <PostList />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
    </Switch>
  </div>
);

export default Nav;
