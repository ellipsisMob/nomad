import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const Profile = props => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      setLoading(true);
      fetch(`/api/devs/${id}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .then(() => setLoading(false));
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log('Profile page: ', user);
  }, [user]);

  return (
    <div>

      {!loading
        ? ( <div>
          <h1>
            name: {user.name}
          </h1>
          <h1>
            Age: {user.age}
          </h1>
          </div> 
          )
        : <h1>loading users...</h1>}
    </div>
  );
};

export default Profile;
