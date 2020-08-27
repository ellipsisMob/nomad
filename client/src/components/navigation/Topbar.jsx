import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Topbar.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import md5 from 'md5';
import DeveloperContext from '../../contexts/DeveloperContext';

const styles = {
  root: {
    fontSize: '12px',
    textTransform: 'capitalize',
    textDecoration: 'none',
  },
};

const Topbar = ({ classes }) => {
  const { loggedInDev, setLoggedInDev } = useContext(DeveloperContext);
  const history = useHistory();

  const logoutHandler = () => {
    setLoggedInDev({ loggedIn: false });
    history.push('/');
  };

  return (
    <div className="topbar">
      <div className="top-logo">
        <Link to="/" className="logo">Nomad</Link>
      </div>
      <div className="top-nav">
        <div className="top-profile">
          {loggedInDev.loggedIn
            ? (
              <>
                <Link to={`/devs/${md5(loggedInDev.handle)}`}>
                  <Button className={classes.root}>My profile</Button>
                </Link>
                |
                <Button className={classes.root} onClick={logoutHandler}>
                  Sign Out
                </Button>
              </>
            )
            : <Button className={classes.root}><Link className="signInLink" to="/login">Sign In</Link></Button>}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Topbar);
