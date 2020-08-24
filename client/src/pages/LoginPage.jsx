import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MaterialUiLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DeveloperContext from '../contexts/DeveloperContext';
import { Link, useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const { setLoggedInDev, loggedInDev } = useContext(DeveloperContext);
  const [ email, setEmail ] = useState('marciscool@gmail.com');
  const [ password, setPassword ] = useState('haha123');
  const [ wrongCreds, setWrongCreds] = useState(false)
  let history = useHistory();
  
  const handleLogin = (e) => {
    e.preventDefault();

    fetch('api/devs/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setLoggedInDev({
        handle: res.email,
        token: res.token,
        loggedIn: res.loggedIn,
      })
      if(res.loggedIn === true) {
        history.push('/');
      } else { 
        setWrongCreds(true);
        setLoggedInDev({loggedIn: false});
      }
    })
    .catch(err => console.log(err));

    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    console.log(email);
    console.log('From login page',loggedInDev);
  }, [email]);

  useEffect(() => {
    console.log(password);
  }, [password]);
  
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {wrongCreds 
          ? <h1>Wrong username or password</h1>
          : null
          }
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <MaterialUiLink href="#" variant="body2">
                Forgot password?
              </MaterialUiLink> */}
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                <MaterialUiLink>{"Don't have an account? Sign Up"}</MaterialUiLink>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={8}>
      </Box> */}
    </Container>
  );
} 