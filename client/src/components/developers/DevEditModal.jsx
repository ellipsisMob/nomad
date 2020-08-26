import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditDev = props => {
  const { name, id, setUpdateDev } = props;
  const [open, setOpen] = useState(false);
  const [dev, setdev] = useState({
    name: '',
    // email: '', age: '',
  });

  const handleClickOpen = () => {
    setdev({
      name: name,
      // age: age,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = e => {
    setdev({
      ...dev,
      [e.target.name]: e.target.value,
    });
  };

  const updatedev = () => {
    fetch(`/api/devs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name: dev.name,
      }),
    })
      .then(() => setUpdateDev(true));
    handleClose();
  };

  useEffect(() => {
    console.log(dev.name);
  }, [dev]);

  return (
    <>
      <EditIcon onClick={handleClickOpen} />
      {/* <Button age="primary" onClick={handleClickOpen}>
        Edit
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit dev</DialogTitle>
        <DialogContent>

          <TextField
            margin="dense"
            name='name'
            label="name"
            value={dev.name}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name='age'
            label="age"
            value={dev.age}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          {/* <TextField
            margin="dense"
            name='email'
            label="email"
            value={dev.email}
            onChange={e => handleInputChange(e)}
            fullWidth
          /> */}
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
          <Button onClick={updatedev} age="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDev;
