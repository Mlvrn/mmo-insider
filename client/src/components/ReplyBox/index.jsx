import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { formatRelativeTime } from '@utils/format';

import classes from './style.module.scss';

const ReplyBox = ({ reply }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Avatar className={classes.avatarUser} src={`${import.meta.env.VITE_API_BASE_URL}${reply?.user?.avatar}`} />
        <div className={classes.content}>
          <div className={classes.name} onClick={() => navigate(`/profile/user/${reply?.user?.username}`)}>
            @{reply?.user?.username} • {formatRelativeTime(reply?.createdAt)} <FormattedMessage id="app_ago" />
          </div>
          <div className={classes.comment}>{reply?.text}</div>
        </div>
      </div>
    </div>
  );
};

ReplyBox.propTypes = {
  reply: PropTypes.object,
};

export default ReplyBox;
