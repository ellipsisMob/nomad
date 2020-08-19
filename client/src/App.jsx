import React from 'react';
import './App.css';
import { BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Topbar from './components/Topbar';
import Nav from './components/Nav';
import PostList from './components/PostList';
import Profile from './components/Profile';

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
