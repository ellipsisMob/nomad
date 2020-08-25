import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import events from '../../../../routes/events';

const AddEvent = props => {
  // const { date, duration, title } = props;
  
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(''); 
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');

  // const [event, setEvent] = useState({
  //   date: '',
  //   duration: '',
  //   title: '',
  // });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
  
  // const handleInputChange = (e) => {
  //   console.log('coming from the handleinput', event);
  //   setEvent({
  //     ...event,
  //     [e.target.date]: e.target.value,
  //   })
  // }

  useEffect(() => {
    console.log('Coming from the useEffect', date, duration, title)
  },[date, duration, title]);

  const handleAddEvent = (e) => {
    console.log('coming from addevent', date, duration, title)
    fetch('api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "date": date, 
        "duration": duration,
        "title": title,
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log('coming from the event page', res);
      handleClose();
      // history.push('/events')
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <Button age="primary" onClick={handleClickOpen}>
        Add Date
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add date</DialogTitle>
        <DialogContent>

          <TextField
            id="datetime-local"
            label="Date"
            type="datetime-local"
            defaultValue="2020-08-25T10:30"
            onChange={e => setDate(e.target.value)}
            // className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name='duration'
            label="duration"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            name='title'
            label="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />
          {/* <TextField
            margin="dense"
            name='fuel'
            label="fuel"
            value={dev.fuel}
            onChange={e => handleInputChange(e)}
            fullWidth
          /> */}
          {/* <TextField
            margin="dense"
            name='year'
            label="year"
            value={dev.year}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name='price'
            label="price"
            value={dev.price}
            onChange={e => handleInputChange(e)}
            fullWidth
          /> */}
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