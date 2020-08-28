import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: '#2980B9',
    color: 'white',
    textTransform: 'capitalize',
    fontWeight: '400',
    margin: '0 0 15px 0',
    padding: '5px 15px',
    width: '250px',
  },
}));

const AddEvent = props => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(moment().format());
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddEvent = () => {
    fetch('api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        duration: Math.floor(duration),
        title,
      }),
    })
      .then(res => res.json())
      .then(() => {
        props.setEventAdded(props.eventAdded + 1);
        setDuration('');
        setTitle('');
        handleClose();
      });
  };

  const classes = useStyles();

  return (
    <>
      <Button age="primary" className={classes.button} onClick={handleClickOpen}>
        New Meetup
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Meetup</DialogTitle>
        <DialogContent>
          <TextField
            id="datetime-local"
            label="Date"
            type="datetime-local"
            defaultValue="2020-08-25T10:30"
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }} />
          <TextField
            margin="dense"
            name="duration"
            label="Duration (minutes)"
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            fullWidth />
          <TextField
            margin="dense"
            name="title"
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} age="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} age="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEvent;
