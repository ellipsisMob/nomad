import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './DevIntro.css';

const DevIntro = props => {
  const { id, identifier, data } = props;

  return (
    <div className='devIntro'>
      <img src='http://placebeard.it/g/640x480' style={{width:'200px'}}/>
      <h1>{data.identifier}</h1>
      <p>{data.name}</p>
      <p>{data.about}</p>
      <Link to={`/devs/${id}`}>Full profile...</Link>
    </div>
  );
};

export default DevIntro;