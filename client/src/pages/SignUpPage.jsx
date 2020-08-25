import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeveloperContext from '../contexts/DeveloperContext';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  // const [ fname, setFname ] = useState('');
  // const [ lname, setLname ] = useState('');
  const { signedUp, setSignedUp } = useContext(DeveloperContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch('api/devs', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({
        // "firstname": fname,
        // "lastname": lname,
        "email": email,
        "password": password,
        "confirmPassword": password,
        "handle": email
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log('coming from the signup response', res);
      setSignedUp(true);
      history.push('/login')
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log("signed up", signedUp);
  }, []);

  useEffect(() => {
    // console.log(fname);
    // console.log(lname);
    console.log(email);
    console.log(password);
  }, [email, password]);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {loading
        ? <CircularProgress />
        : <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={(e) => setFname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              onChange={(e) => setLname(e.target.value)}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid> */}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            {/* <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link> */}
          </Grid>
        </Grid>
      </form>
        }
        {/*  */}
      </div>
    </Container>
  );
}
