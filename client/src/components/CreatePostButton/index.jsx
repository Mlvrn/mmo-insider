import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';

const CreatePostButton = () => {
  const navigate = useNavigate();
  const navigateCreate = () => {
    navigate('/post/create');
  };
  return (
    <div className={classes.button} onClick={navigateCreate}>
      <Plus /> <FormattedMessage id="app_new_post" />
    </div>
  );
};

export default CreatePostButton;
