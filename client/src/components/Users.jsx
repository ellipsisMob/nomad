import React, { useState, useEffect } from 'react';

// Users being fetched from firebase with the right url.
function Users() {
  const fetchExpress = () => {
    fetch('http://localhost:8000/data')
      .then(res => res.json())
      .then(data => console.log('from fetch', data))
  }

  return(
    <div className="test">
      <p>Hello from users</p>
      <button onClick={fetchExpress}>Get users</button>
    </div>
  )
}

export default Users;
