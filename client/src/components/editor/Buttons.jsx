import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const SubmitButton = props => {
  const classes = useStyles();
  const { onClickFn, disabled } = props;

  return (
    <Button
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={onClickFn}
      className={classes.button}
      endIcon={<Icon>send</Icon>}>
      Submit Post
    </Button>
  );
};

export default SubmitButton;

