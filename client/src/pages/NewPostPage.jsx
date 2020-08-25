import React, { useContext } from 'react';
import Editor from '../components/editor/Editor';
import DeveloperContext from '../contexts/DeveloperContext'

const NewPostPage = () => {

  const { loggedInDev } = useContext(DeveloperContext);

  return <Editor token={loggedInDev.token} />;

};

export default NewPostPage;
