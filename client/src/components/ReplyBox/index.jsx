import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';

import { formatRelativeTime } from '@utils/format';

import classes from './style.module.scss';

const ReplyBox = ({ reply }) => (
  <div className={classes.container}>
    {/* <div className={classes.verticalLine} /> */}
    <div className={classes.wrapper}>
      <Avatar className={classes.avatarUser} src="https://source.unsplash.com/500x500/?avatar" />
      <div className={classes.content}>
        <div className={classes.name}>
          {reply?.user?.username} • {formatRelativeTime(reply?.createdAt)}
        </div>
        <div className={classes.comment}>{reply?.text}</div>
      </div>
    </div>
  </div>
);

ReplyBox.propTypes = {
  reply: PropTypes.object,
};

export default ReplyBox;
