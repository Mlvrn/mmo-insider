import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import classes from './style.module.scss';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className={classes.button}>
      <ChevronLeft />
      <FormattedMessage id="app_back" />
    </div>
  );
};

export default BackButton;
