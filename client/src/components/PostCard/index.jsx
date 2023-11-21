import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { formatRelativeTime } from '@utils/format';

import classes from './style.module.scss';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const navigateDetails = () => {
    navigate(`/post/${post?.id}`);
  };
  return (
    <div className={classes.post} onClick={navigateDetails}>
      <img src={post?.mainImage} alt={post?.title} className={classes.postImage} />
      <div className={classes.postContent}>
        <div className={classes.postTitle}>{post?.title}</div>
        <div className={classes.postDescription}>{post?.shortDescription}</div>
        <div className={classes.postAuthor}>
          {post?.author.username} - {formatRelativeTime(post?.createdAt)}
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
