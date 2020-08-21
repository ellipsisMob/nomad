import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Topbar from './components/navigation/Topbar';
import Nav from './components/navigation/Nav';
import SinglePost from './components/posts/SinglePost';
import Profile from './components/developers/Profile';
import Footer from './components/footer/Footer';
import CalenderPage from './pages/CalenderPage';
import HomePage from './pages/HomePage';
import DevelopersPage from './pages/DevelopersPage';
import NewPostPage from './pages/NewPostPage';

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
            <HomePage />
          </Route>
          <Route exact path="/posts/:id">
            <SinglePost />
          </Route>
          <Route path="/devs/:id">
            <Profile />
          </Route>
          <Route path="/devs">
            <DevelopersPage />
          </Route>
          <Route path="/addPost">
            <NewPostPage />
          </Route>
          <Route path="/meetups">
            <CalenderPage />
          </Route>
          <Route render={() => 'Page not found'} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
