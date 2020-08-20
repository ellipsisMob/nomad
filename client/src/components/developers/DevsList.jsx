import React, { useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';

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

  useEffect(() => {
    console.log('from useEffect hook', users);
  }, [users]);

  return (
    <div className="container">
      <h1>Our Developers:  </h1>
      {!loading
        ? users.map(user => (
          <h3><Link key={user.id} to={`/devs/${user.id}`}>{user.data.name}</Link></h3>
        ))
        : <h1>loading users...</h1>}
    </div>
  );
};

export default UserList;
