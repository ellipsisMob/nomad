import React, { useContext } from 'react';
import Editor from '../components/editor/Editor';
import DeveloperContext from '../contexts/DeveloperContext'

const NewPostPage = () => {

  const { token } = useContext(DeveloperContext);

  return (
    <div>
      <Editor />
    </div>
  );
};

export default NewPostPage;
