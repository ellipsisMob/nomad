import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './DevIntro.css';

const DevIntro = props => {
  const { id, identifier, data } = props;

  return (
    <div className='devIntro'>
      <img className="devPicture" src='http://placebeard.it/g/640x480' alt={`Profile mugshot of ${data.name}`} />
      {/* <h1>{data.identifier}</h1> */}
      <p>{data.name}</p>
      <p>{data.title}</p>
      <Link to={`/devs/${id}`}>Full profile...</Link>
    </div>
  );
};

export default DevIntro;