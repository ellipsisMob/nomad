import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DeveloperContext from './contexts/DeveloperContext';
import Topbar from './components/navigation/Topbar';
import Nav from './components/navigation/Nav';
import SinglePost from './components/posts/SinglePost';
import Profile from './components/developers/Profile';
import Footer from './components/footer/Footer';
import CalenderPage from './pages/CalenderPage';
import HomePage from './pages/HomePage';
import DevelopersPage from './pages/DevelopersPage';
import NewPostPage from './pages/NewPostPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import './App.css';

function App() {
  const [loggedInDev, setLoggedInDev] = useState({ loggedIn: false });
  const [signedUp, setSignedUp] = useState(false);

  return (
    <div className="App">
      <Router>
        <DeveloperContext.Provider value={{ loggedInDev, setLoggedInDev, signedUp, setSignedUp }}>
          <div className="bars">
            <Topbar />
            <Nav />
          </div>
          <div className="content">
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
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/SignUp">
                <SignUpPage />
              </Route>
              <Route render={() => 'Page not found'} />
            </Switch>
          </div>
          <Footer />
        </DeveloperContext.Provider>
      </Router>
    </div>
  );
}

export default App;
