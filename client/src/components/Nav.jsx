import React from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import PostList from './PostList';
import Profile from './Profile';
import UserList from './UserList';

const Nav = () => (
  <div className="navbar">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {/* <li>
        <Link to="/profile">profile</Link>
      </li> */}
      <li>
        <Link to="/asdf">should show not found</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
    </ul>
    <Switch>
      <Route exact path="/">
        <PostList />
      </Route>
      {/* <Route path="/profile">
        <Profile />
      </Route> */}
      <Route path="/users/:id">
        <Profile />
      </Route>
      <Route path="/users">
        <UserList />
      </Route>
      <Route render={() => 'Page not found'} />
    </Switch>
  </div>
);

export default Nav;
