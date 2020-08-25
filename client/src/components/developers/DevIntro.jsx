import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './DevIntro.css';

const DevIntro = props => {
  const { id, data } = props;

  return (
    <div className="devIntro">
      <div className="devInfo">
        <h2>{data.name}</h2>
        <p>{data.title}</p>
        <Link to={`/devs/${id}`}>Full profile...</Link>
      </div>
      <div className="devPicture">
        <img className="devPicture" src="http://placebeard.it/g/640x480" alt={`Profile mugshot of ${data.name}`} />
      </div>
    </div>
  );
};

export default DevIntro;
