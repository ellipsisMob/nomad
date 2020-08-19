import React, { useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';
import Profile from './developers/Profile';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = () => {
      setLoading(true);
      fetch('/api/users')
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
      <h1>Users: </h1>
      {!loading
        ? users.map(user => (
          <Link key={user.id} to={`/users/${user.id}`}>{user.data.name}</Link>
        ))
        : <h1>loading users...</h1>}
    </div>
  );
};

export default UserList;
