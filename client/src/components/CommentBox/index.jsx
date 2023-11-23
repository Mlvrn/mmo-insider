import PropTypes from 'prop-types';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';

import { formatRelativeTime } from '@utils/format';
import { createReply } from '@pages/PostDetail/action';

import ReplyBox from '@components/ReplyBox';

import classes from './style.module.scss';

const CommentBox = ({ comment, postId, parentId, token, replies }) => {
  const dispatch = useDispatch();
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
    // Dispatch an action to create a reply comment with replyText and comment.id
    // Reset replyText and hide the reply input
    dispatch(createReply(postId, parentId, replyText, token));
    setReplyText('');
    setShowReplyInput(false);
  };
  return (
    <div className={classes.container}>
      <div className={classes.commentContainer}>
        <Avatar className={classes.avatarUser} src="https://source.unsplash.com/500x500/?avatar" />
        <div className={classes.content}>
          <div className={classes.name}>
            {comment?.user?.username} • {formatRelativeTime(comment?.createdAt)}
          </div>
          <div className={classes.comment}>{comment?.text}</div>
          <div className={classes.reply} onClick={handleReply}>
            Reply
          </div>
        </div>
      </div>
      {showReplyInput && (
        <div className={classes.replyInputContainer}>
          <textarea
            placeholder="Write a reply..."
            className={classes.replyInput}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className={classes.replyActions}>
            <button type="button" className={`${classes.button} ${classes.cancelButton}`} onClick={handleCancelReply}>
              Cancel
            </button>
            <button type="button" className={`${classes.button} ${classes.replyButton}`} onClick={handleSubmitReply}>
              Reply
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
};

export default CommentBox;
