import React, { useState, useEffect } from 'react';

function Users() {

  const fetchExpress = () => {
    fetch('http://localhost:8000/')
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
