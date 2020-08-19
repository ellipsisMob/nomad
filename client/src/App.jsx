import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Topbar from './components/Topbar';
import Nav from './components/Nav';
import PostList from './components/PostList';
import Profile from './components/Profile';
import DevsList from './components/DevsList';

function App() {
  return (
    <div className="App">
      <Router>
        <Topbar />
        <Nav />
        <Switch>
          <Route exact path="/">
            <PostList />
          </Route>
          <Route path="/devs/:id">
            <Profile />
          </Route>
          <Route path="/devs">
            <DevsList />
          </Route>
          <Route render={() => 'Page not found'} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
