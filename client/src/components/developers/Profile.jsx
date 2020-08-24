import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import DeveloperContext from '../../contexts/DeveloperContext';

const Profile = props => {
  const { loggedInDev } = useContext(DeveloperContext);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Logged in dev: ', loggedInDev);
    const fetchUser = () => {
      setLoading(true);
      fetch(`/api/devs/${id}`
      // Example for authorization
      , {
        headers: {
          Authorization: `Bearer ${loggedInDev.token}`
        }}
      )
        .then(res => res.json())
        .then(data => setUser(data))
        .then(() => setLoading(false));
    };
    fetchUser();
  }, [id]);

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
          </div>
        )
        : <h1>loading users...</h1>}
    </div>
  );
};

export default Profile;
