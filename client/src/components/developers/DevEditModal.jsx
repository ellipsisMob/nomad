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
  const { id, name, github, linkedin, about, updateDev, setUpdateDev, profilePic } = props;
  const [open, setOpen] = useState(false);
  const [dev, setdev] = useState({
    name,
    github,
    linkedin,
    name,
    about,
    profilePic
  });

  const handleClickOpen = () => {
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
        github: dev.github,
        linkedin: dev.linkedin,
        about: dev.about,
        profilePic: dev.profilePic,

      }),
    })
      .then(() => setUpdateDev(updateDev + 1))
      .then(() => handleClose())
  };

  useEffect(() => {
    console.log('useEff', dev);
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
            label="Name"
            value={dev.name}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="profilePic"
            label="profilePic"
            value={dev.profilePic}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name='github'
            label="Github (https:// required at beginning)"
            value={dev.github}
            placeholder='https://github.com/profilename'
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name='linkedin'
            label="Linkedin (https:// required at beginning)"
            placeholder="https://www.linkedin.com/in/example-profile-b2350b153/"
            value={dev.linkedin}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name='about'
            label="About"
            value={dev.about}
            onChange={e => handleInputChange(e)}
            fullWidth
          />
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
