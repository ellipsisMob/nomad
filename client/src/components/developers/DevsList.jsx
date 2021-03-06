import React, { useState, useEffect } from 'react';
import DevIntro from './DevIntro';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = () => {
      setLoading(true);
      fetch('/api/devs')
        .then(res => res.json())
        .then(data => setUsers(data))
        .then(() => setLoading(false));
    };
    fetchUsers();
  }, []);

  return (
    <>
      {!loading
        ? users.map(user => {
          if (user.data.name) {
            return <DevIntro key={user.id} id={user.id} data={user.data} />;
          }
        })
        : <h1>Loading ...</h1>}
    </>
  );
};

export default UserList;
