import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import DeveloperContext from '../../contexts/DeveloperContext';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DevEditModal from './DevEditModal';

const Profile = props => {
  const { loggedInDev } = useContext(DeveloperContext);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateDev, setUpdateDev] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete this post?')) {
      fetch(`/api/devs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({id}),
      })
        .then(res => window.location.replace('/'))
        .catch(err => console.log(err));
    }
  };

  const fetchUser = () => {
    setLoading(true);
    fetch(`/api/devs/${id}`, {
      headers: {
        Authorization: `Bearer ${loggedInDev.token}`
      }}
    )
      .then(res => res.json())
      .then(data => setUser(data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    console.log('Logged in dev: ', loggedInDev);
    // const fetchUser = () => {
    //   setLoading(true);
    //   fetch(`/api/devs/${id}`, {
    //     headers: {
    //       Authorization: `Bearer ${loggedInDev.token}`
    //     }}
    //   )
    //     .then(res => res.json())
    //     .then(data => setUser(data))
    //     .then(() => setLoading(false));
    // };
    fetchUser();
  }, [id, updateDev]);

  useEffect(() => {
    console.log('Profile page: ', user);
  }, [user]);

  return (
    <div>

      {!loading
        ? (
          <div>
            <img src='http://placebeard.it/g/640x480' style={{width:'200px'}}/>
            <h1>
              {user.data.name}
            </h1>
            <h3>
              {user.data.age}
            </h3>
            <h3>
              {user.data.email}
            </h3>
            <a href={user.data.github}>
              {user.data.github}
            </a>
            <p>
              {user.data.about}
            </p>
            <Button 
              startIcon={<DeleteIcon />}
              color="secondary"
              onClick={handleDelete}>
              Delete
            </Button>
            <DevEditModal
              name={user.data.name}
              id={user.id}
              setUpdateDev={setUpdateDev}
            />
          </div>
        )
        : <h1>loading users...</h1>}
    </div>
  );
};

export default Profile;
