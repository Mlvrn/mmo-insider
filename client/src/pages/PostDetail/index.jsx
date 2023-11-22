import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Pencil, Trash2 } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import { formatRelativeTime } from '@utils/format';
import BackButton from '@components/BackButton';
import ConfirmDeleteModal from '@components/ConfirmDeleteModal';

import { selectLoading } from '@containers/App/selectors';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { deletePostById, getPostById, resetDeleteSuccess } from './action';
import { selectDeleteSuccess, selectPost } from './selectors';

import classes from './style.module.scss';

const PostDetail = ({ post, loading, user, token, deleteSuccess }) => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    dispatch(deletePostById(post.id, token));
    navigate('/');
  };

  useEffect(() => {
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    console.log('deleteSuccess in useEffect:', deleteSuccess);
    if (deleteSuccess) {
      navigate('/');
      dispatch(resetDeleteSuccess());
    }
  }, [deleteSuccess, navigate, dispatch]);

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress color="warning" />
      </div>
    );
  }
  if (post) {
    const isAuthor = user?.username === post?.author?.username;
    return (
      <div className={classes.container}>
        <div className={classes.containerHeader}>
          <BackButton />
          {isAuthor && (
            <div className={classes.actions}>
              <div className={`${classes.button} ${classes.buttonEdit}`}>
                <Pencil className={classes.icon} /> <FormattedMessage id="app_edit" />
              </div>
              <div className={`${classes.button} ${classes.buttonDelete}`} onClick={handleDeleteClick}>
                <Trash2 className={classes.icon} /> <FormattedMessage id="app_delete" />
              </div>
            </div>
          )}
          <ConfirmDeleteModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteConfirm}
          />
        </div>
        <div className={classes.postTitle}>{post?.title}</div>
        <div className={classes.postDescription}>{post?.shortDescription}</div>
        <div>
          <div className={classes.postAuthor}>
            <FormattedMessage id="app_posted_by" /> {post?.author?.username} • {formatRelativeTime(post?.createdAt)}
          </div>
          <img
            src={
              post?.mainImage?.startsWith('https://')
                ? post?.mainImage
                : `${import.meta.env.VITE_API_BASE_URL}${post?.mainImage}`
            }
            alt={post?.title}
            className={classes.postImage}
          />
          <div className={classes.postContent} dangerouslySetInnerHTML={{ __html: post?.content }} />
        </div>
      </div>
    );
  }
};

PostDetail.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.bool,
  user: PropTypes.object,
  token: PropTypes.string,
  deleteSuccess: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  post: selectPost,
  loading: selectLoading,
  user: selectUser,
  token: selectToken,
  deleteSuccess: selectDeleteSuccess,
});

export default connect(mapStateToProps)(PostDetail);
