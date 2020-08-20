import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Topbar from './components/navigation/Topbar';
import Nav from './components/navigation/Nav';
import PostList from './components/posts/PostList';
import SinglePost from './components/posts/SinglePost';
import Profile from './components/developers/Profile';
import DevsList from './components/developers/DevsList';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="bars">
          <Topbar />
          <Nav />
        </div>
        <Switch>
          <Route exact path="/">
            <PostList />
          </Route>
          <Route exact path="/posts/:id">
            <SinglePost />
          </Route>
          <Route path="/devs/:id">
            <Profile />
          </Route>
          <Route path="/devs">
            <DevsList />
          </Route>
          <Route render={() => 'Page not found'} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
