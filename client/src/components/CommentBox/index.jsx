import PropTypes from 'prop-types';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import { formatRelativeTime } from '@utils/format';
import { createReply } from '@pages/PostDetail/action';

import ReplyBox from '@components/ReplyBox';

import classes from './style.module.scss';

const CommentBox = ({ comment, postId, parentId, token, replies, user, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    setShowReplyInput(true);
  };

  const handleCancelReply = () => {
    setShowReplyInput(false);
    setReplyText('');
  };

  const handleSubmitReply = () => {
    dispatch(createReply(postId, parentId, replyText, token));
    setReplyText('');
    setShowReplyInput(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.commentContainer}>
        <Avatar className={classes.avatarUser} src={`${import.meta.env.VITE_API_BASE_URL}${comment?.user?.avatar}`} />
        <div className={classes.content}>
          <div className={classes.name} onClick={() => navigate(`/profile/user/${comment?.user?.username}`)}>
            @{comment?.user?.username} • {formatRelativeTime(comment?.createdAt)} <FormattedMessage id="app_ago" />
          </div>
          <div className={classes.comment}>{comment?.text}</div>
          <div className={classes.reply} onClick={handleReply}>
            <FormattedMessage id="app_reply" />
          </div>
        </div>
      </div>
      {showReplyInput && (
        <div className={classes.replyInputContainer}>
          <div className={classes.replyInputWrapper}>
            <Avatar src={`${import.meta.env.VITE_API_BASE_URL}${user?.avatar}`} />
            <textarea
              placeholder={formatMessage({ id: 'app_reply_placeholder' })}
              className={classes.replyInput}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </div>
          <div className={classes.replyActions}>
            <button type="button" className={`${classes.button} ${classes.cancelButton}`} onClick={handleCancelReply}>
              <FormattedMessage id="app_cancel" />
            </button>
            <button type="button" className={`${classes.button} ${classes.replyButton}`} onClick={handleSubmitReply}>
              <FormattedMessage id="app_reply" />
            </button>
          </div>
        </div>
      )}
      {replies?.map((reply, index) => (
        <ReplyBox key={index} reply={reply} />
      ))}
    </div>
  );
};

CommentBox.propTypes = {
  comment: PropTypes.object,
  postId: PropTypes.number,
  parentId: PropTypes.number,
  token: PropTypes.string,
  replies: PropTypes.array,
  user: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(CommentBox);
