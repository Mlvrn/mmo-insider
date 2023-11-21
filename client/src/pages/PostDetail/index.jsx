import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

import { formatRelativeTime } from '@utils/format';

import { selectLoading } from '@containers/App/selectors';
import { getPostById } from './action';
import { selectPost } from './selectors';

import classes from './style.module.scss';

const PostDetail = ({ post, loading }) => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress color="warning" />
      </div>
    );
  }
  if (post) {
    return (
      <div className={classes.container}>
        <div className={classes.postTitle}>{post?.title}</div>
        <div className={classes.postDescription}>{post?.shortDescription}</div>
        <div>
          <div className={classes.postAuthor}>
            By {post?.author?.username} • {formatRelativeTime(post?.createdAt)}
          </div>
          <img src={post?.mainImage} alt={post?.title} className={classes.postImage} />
          <div className={classes.postContent} dangerouslySetInnerHTML={{ __html: post?.content }} />
        </div>
      </div>
    );
  }
};

PostDetail.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  post: selectPost,
  loading: selectLoading,
});

export default connect(mapStateToProps)(PostDetail);
