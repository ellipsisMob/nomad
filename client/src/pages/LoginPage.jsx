import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MaterialUiLink from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DeveloperContext from '../contexts/DeveloperContext';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#E74C3C',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2980B9',
  },
  signup: {
    color: '#7F8C8D',
    textDecoration: 'none',
  },
}));

export default function SignIn() {
  const {
    setLoggedInDev, signedUp, setSignedUp,
  } = useContext(DeveloperContext);
  const [email, setEmail] = useState('marciscool@gmail.com');
  const [password, setPassword] = useState('haha123');
  const [wrongCreds, setWrongCreds] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

  const isEnabled = pattern.test(email) && password.length > 0;
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleLogin = e => {
    e.preventDefault();
    setLoading(true);

    fetch('api/devs/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.general === 'Wrong username or password') {
          setWrongCreds(true);
          setLoading(false);
        } else {
          setLoggedInDev({
            handle: res.email,
            token: res.token,
            loggedIn: res.loggedIn,
          });
          if (res.loggedIn === true) {
            history.push('/');
          } else {
            setWrongCreds(true);
            setSignedUp(false);
            setLoggedInDev({ loggedIn: false });
          }
        }
      })
      .catch(err => console.log(err));

    setEmail('');
    setPassword('');
  };

  // useEffect(() => {
  //   console.log(email);
  //   console.log('From login page', loggedInDev);
  // }, [email]);

  // useEffect(() => {
  //   console.log(email);
  //   console.log('From login page', loggedInDev);
  // }, [email]);

  useEffect(() => {
    console.log('Signed Up', signedUp);
    if (signedUp) {
      setOpen(true);
    }
    setSignedUp(false);
  }, [signedUp, setSignedUp]);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">

      {setOpen
        ? (
          <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Signed up succesfully! Please login using your credentials.
              </Alert>
            </Snackbar>
          </div>
        )
        : null }

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {loading
          ? <CircularProgress />
          : (
            <form className={classes.form} noValidate>
              <ValidatorForm>
                <TextValidator
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
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                  onChange={e => setEmail(e.target.value)} />
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
                  onChange={e => setPassword(e.target.value)} />
              </ValidatorForm>
              {wrongCreds
                ? <h1>Wrong username or password</h1>
                : null}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me" />
              <Button
                disabled={!isEnabled}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLogin}>
                Sign In
              </Button>
              <Link className={classes.signup} to="/signup" variant="body2">
                <MaterialUiLink className={classes.signup}>
                  Don&apos;t have an account? Sign Up
                </MaterialUiLink>
              </Link>
            </form>
          )}
      </div>
    </Container>
  );
}
