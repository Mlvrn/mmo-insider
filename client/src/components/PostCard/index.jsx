import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { downvotePost, upvotePost } from '@pages/Home/actions';
import { selectToken } from '@containers/Client/selectors';
import { formatRelativeTime } from '@utils/format';

import classes from './style.module.scss';

const PostCard = ({ post, token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpvote = () => {
    if (token && post) {
      dispatch(upvotePost(post.id, token));
    }
  };

  const handleDownvote = () => {
    if (token && post) {
      dispatch(downvotePost(post.id, token));
    }
  };

  const navigateDetails = () => {
    navigate(`/post/${post?.id}`);
  };
  return (
    <div className={classes.postContainer}>
      <div className={classes.votes}>
        <ArrowBigUp className={classes.voteButton} onClick={handleUpvote} />
        <div className={classes.voteCount}>{post?.voteCount}</div>
        <ArrowBigDown className={classes.voteButton} onClick={handleDownvote} />
      </div>
      <div className={classes.post} onClick={navigateDetails}>
        <img
          src={
            post?.mainImage?.startsWith('https://')
              ? post?.mainImage
              : `${import.meta.env.VITE_API_BASE_URL}${post?.mainImage}`
          }
          alt={post?.title}
          className={classes.postImage}
        />
        <div className={classes.postContent}>
          <div className={classes.postTitle}>{post?.title}</div>
          <div className={classes.postDescription}>{post?.shortDescription}</div>
          <div className={classes.postAuthor}>
            {post?.author?.username} - {formatRelativeTime(post?.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(PostCard);
