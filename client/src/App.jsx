import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import PostList from './components/PostList';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <h1>Blog</h1>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
          <li>
            <Link to="/asdf">should show not found</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <PostList />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route render={() => 'Page not found'} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
