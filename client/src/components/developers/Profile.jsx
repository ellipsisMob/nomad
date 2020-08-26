import React, { useState, useEffect, useContext } from 'react';
import { useParams} from 'react-router';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import DevEditModal from './DevEditModal';
import DeveloperContext from '../../contexts/DeveloperContext';
import './Profile.css';
import md5 from 'md5';
import { SelectionState } from 'draft-js';

const Profile = props => {
  const { loggedInDev } = useContext(DeveloperContext);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateDev, setUpdateDev] = useState(false);
  const [ personalProfile, setPersonalProfile ] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete this user?')) {
      fetch(`/api/devs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
        .then(res => window.location.replace('/'))
        .catch(err => console.log(err));
    }
  };

  const fetchUser = () => {
    setLoading(true);
    fetch(`/api/devs/${id}`, {
      headers: {
        Authorization: `Bearer ${loggedInDev.token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    console.log('Logged in dev: ', loggedInDev);
    fetchUser();
  }, [id, updateDev]);

  useEffect(() => {
    console.log('Profile page: ', user);
  }, [user]);

  useEffect(() => {
    if(loggedInDev.loggedIn) {
      if (md5(loggedInDev.handle) === id) {
        setPersonalProfile(true);
      }
    }
  }, []);

  return (
    <>
      {!loading
        ? (
          <div className="devProfile">
            <div className="devHeader">
              <img className="profilePicture" src={user.data.profilePic} alt={`${user.data.name}`} />
              <div className="devTitle">
                <h2>
                  {user.data.name}
                </h2>
                <p>
                  {user.data.title}
                </p>
                <div className="devContact">
                  <a href={user.data.github}>
                    <GitHubIcon />
                  </a>
                  <a href={user.data.linkedin}>
                    <LinkedInIcon />
                  </a>
                  <a href={user.data.email}>
                    <EmailIcon />
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <div className="devAbout">
              <h3>About</h3>
              <p>
                {user.data.about}
              </p>
              <div className="devPosts">
                <h3>
                  Posts from
                  &nbsp;{user.data.name}
                </h3>
                <h4>Something here</h4>
                <p>About a random subject, written letters</p>
              </div>
            </div>

            {personalProfile
            ? <div className="devControls">
                <DevEditModal
                  name={user.data.name}
                  id={user.id}
                  profilePic={user.data.profilePic}
                  setUpdateDev={setUpdateDev} />
                <Button
                  startIcon={<DeleteIcon />}
                  color="secondary"
                  onClick={handleDelete} />
              </div>
            : null}

            {/* <div className="devControls">
              <DevEditModal
                name={user.data.name}
                id={user.id}
                profilePic={user.data.profilePic}
                setUpdateDev={setUpdateDev} />
              <Button
                startIcon={<DeleteIcon />}
                color="secondary"
                onClick={handleDelete} />
            </div> */}
          </div>
        )
        : <h1>loading users...</h1>}
    </>
  );
};

export default Profile;
