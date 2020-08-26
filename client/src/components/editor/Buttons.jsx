import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

// https://material-ui.com/components/buttons/
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const SubmitButton = props => {
  const classes = useStyles();

  const { onClickFn } = props;

  return (
    <Button
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

//   <Button
//     variant="contained"
//     color="secondary"
//     className={classes.button}
//     startIcon={<DeleteIcon />}
//   >
//     Delete
//   </Button>
// eslint-disable-next-line max-len
//   {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
//   <Button
//     variant="contained"
//     color="default"
//     className={classes.button}
//     startIcon={<CloudUploadIcon />}
//   >
//     Upload
//   </Button>
//   <Button
//     variant="contained"
//     disabled
//     color="secondary"
//     className={classes.button}
//     startIcon={<KeyboardVoiceIcon />}
//   >
//     Talk
//   </Button>
//   <Button
//     variant="contained"
//     color="primary"
//     size="small"
//     className={classes.button}
//     startIcon={<SaveIcon />}
//   >
//     Save
//   </Button>
//   <Button
//     variant="contained"
//     color="primary"
//     size="large"
//     className={classes.button}
//     startIcon={<SaveIcon />}
//   >
//     Save
//   </Button>
