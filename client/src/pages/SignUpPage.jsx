import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DeveloperContext from '../contexts/DeveloperContext';
import '../components/password/PasswordStrengthMeter';
import PasswordStrengthMeter from '../components/password/PasswordStrengthMeter';


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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const { signedUp, setSignedUp } = useContext(DeveloperContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

  const isEnabled = pattern.test(email) && password.length > 0;

  const history = useHistory();

  const handleSignUp = e => {
    e.preventDefault();
    setLoading(true);
    setEmailTaken(false);
    fetch('api/devs', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        email,
        password,
        confirmPassword: password,
        handle: email,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.email === 'Email is already taken.') {
          setEmailTaken(true);
          setLoading(false);
        } else {
          console.log('coming from the signup response', res);
          setSignedUp(true);
          history.push('/login');
        }
      })
      .catch(err => console.log('fake pass', err));
  };

  useEffect(() => {
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
              value={email}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
              onChange={(e) => setEmail(e.target.value)}
            />
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
            </ValidatorForm>
            <PasswordStrengthMeter password={password} />
        <Button
          disabled={!isEnabled}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSignUp}>
          Sign Up
        </Button>
      </form>}
      {emailTaken
      ? <h3>Sorry, the email you submitted is already taken.</h3>
      : null}
      </div>
    </Container>
  );
}
