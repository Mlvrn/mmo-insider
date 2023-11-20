import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { formatRelativeTime } from '@utils/format';

import { getPostById } from './action';
import { selectPost } from './selectors';

import classes from './style.module.scss';

const PostDetail = ({ post }) => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  return (
    <div className={classes.container}>
      <div className={classes.postTitle}>{post?.title}</div>
      <div className={classes.postDescription}>{post?.shortDescription}</div>
      <div>
        <div className={classes.postAuthor}>
          By {post?.author.username} • {formatRelativeTime(post?.createdAt)}
        </div>
        <img src={post?.mainImage} alt={post?.title} className={classes.postImage} />
        <div className={classes.postContent} dangerouslySetInnerHTML={{ __html: post?.content }} />
      </div>
    </div>
  );
};

PostDetail.propTypes = {
  post: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  post: selectPost,
});

export default connect(mapStateToProps)(PostDetail);
