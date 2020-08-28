import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { makeStyles } from '@material-ui/core/styles';
import md5 from 'md5';
import DevEditModal from './DevEditModal';
import DeveloperContext from '../../contexts/DeveloperContext';
import './Profile.css';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: '14px',
    textTransform: 'capitalize',
    textDecoration: 'none',
    display: 'block',
  },
}));

const Profile = () => {
  const { loggedInDev } = useContext(DeveloperContext);
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateDev, setUpdateDev] = useState(0);
  const [personalProfile, setPersonalProfile] = useState(false);
  const [postsByUser, setPostsByUser] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete this user?')) {
      fetch(`/api/devs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
        .then(() => window.location.replace('/'));
    }
  };

  const history = useHistory();

  const fetchUser = () => {
    setLoading(true);
    fetch(`/api/devs/${id}`, {
      headers: {
        Authorization: `Bearer ${loggedInDev.token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .then(() => {
        setLoading(false);
      });
  };

  const fetchPosts = () => {
    fetch(`/api/posts/`)
      .then(res => res.json())
      .then(res => {
        const userPosts = res.filter(post => post.data.post.authorId === id);
        setPostsByUser(userPosts);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [id, updateDev]);

  useEffect(() => {
  }, [user]);

  useEffect(() => {
    if (loggedInDev.loggedIn) {
      if (md5(loggedInDev.handle) === id) {
        setPersonalProfile(true);
      }
    }
    fetchPosts();
  }, []);

  const handleClick = (e, post) => {
    e.preventDefault();
    history.push(`/posts/${post.id}`);
  };

  const classes = useStyles();

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
                  Posts by &nbsp;
                  {user.data.name}
                  :
                  {postsByUser
                    ? postsByUser.map(post => <Button key={post.id} className={classes.root} onClick={e => handleClick(e, post)}>{post.data.post.title}</Button>)
                    : <h1>Loading...</h1>}
                </h3>
                <h4>Job title</h4>
                <p>{user.data.title}</p>
              </div>
            </div>

            {personalProfile
              ? <div className="devControls">
                  <DevEditModal
                    id={user.id}
                    name={user.data.name}
                    github={user.data.github}
                    linkedin={user.data.linkedin}
                    about={user.data.about}
                    setUpdateDev={setUpdateDev}
                    updateDev={updateDev}
                    profilePic={user.data.profilePic}
                    title={user.data.title} />

                  <Button
                    startIcon={<DeleteIcon />}
                    color="secondary"
                    onClick={handleDelete} />
                </div>
              : null}
          </div>
        )
        : <h1>loading...</h1>}
    </>
  );
};

export default Profile;
