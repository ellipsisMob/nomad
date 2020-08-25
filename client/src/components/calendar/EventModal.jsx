import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

const AddEvent = props => {
  
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(''); 
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    const newDate = new Date();
    const initialTime = moment(newDate).format();
    setDate(initialTime);
  }, []);

  useEffect(() => {
    const parsedTime = moment(date).format();
    console.log('Coming from the useEffect', parsedTime);
  },[date, duration, title]);

  const handleAddEvent = () => {
    console.log('coming from addevent', date, duration, title)
    fetch('api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "date": date, 
        "duration": Math.floor(duration),
        "title": title,
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log('coming from the event page', res);
      props.setEventAdded(props.eventAdded + 1);
      setDate('');
      setDuration('');
      setTitle('');
      handleClose();
      // history.push('/events')
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <Button age="primary" onClick={handleClickOpen}>
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
            }}
          />
          <TextField
            margin="dense"
            name='duration'
            label="Duration (minutes)"
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            name='title'
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />
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
    </div>
  )
}

export default AddEvent;