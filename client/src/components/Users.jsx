import React from 'react';

// Users being fetched from firebase with the right url.
function Users() {
  const fetchExpress = () => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => console.log('from fetch', data));
  };

  return (
    <div className="test">
      <p>Hello from users</p>
      <button type="button" onClick={fetchExpress}>Get users</button>
    </div>
  );
}

export default Users;
