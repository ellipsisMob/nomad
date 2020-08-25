import React, { useContext } from 'react';
import Editor from '../components/editor/Editor';
import DeveloperContext from '../contexts/DeveloperContext'

const NewPostPage = () => {

  const { loggedInDev } = useContext(DeveloperContext);

  return (
    <div>
      <Editor token={loggedInDev.token} />
    </div>
  );
};

export default NewPostPage;
