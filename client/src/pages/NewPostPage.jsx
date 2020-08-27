import React, { useContext } from 'react';
import Editor from '../components/editor/Editor';
import DeveloperContext from '../contexts/DeveloperContext';

const NewPostPage = props => {

  const { loggedInDev } = useContext(DeveloperContext);
  const { history } = props;
  return <Editor token={loggedInDev.token} history={history} />;
};

export default NewPostPage;
