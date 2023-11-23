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
import CommentBox from '@components/CommentBox';

import { selectLoading } from '@containers/App/selectors';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { createComment, deletePostById, getCommentsByPostId, getPostById, resetDeleteSuccess } from './action';
import { selectComments, selectDeleteSuccess, selectPost } from './selectors';

import classes from './style.module.scss';

const PostDetail = ({ post, loading, user, token, deleteSuccess, comments }) => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getPostById(postId));
    dispatch(getCommentsByPostId(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (deleteSuccess) {
      navigate('/');
      dispatch(resetDeleteSuccess());
    }
  }, [deleteSuccess, navigate]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    dispatch(deletePostById(post?.id, token));
  };

  const navigateEdit = () => {
    navigate(`/post/edit/${post?.id}`);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== '') {
      dispatch(createComment(postId, commentText, token));
      setCommentText('');
    }
  };

  const isAuthor = user?.username === post?.author?.username;
  const isAdmin = user?.role === 1;

  return (
    <div className={classes.container}>
      <div className={classes.containerHeader}>
        <BackButton />
        {(isAuthor || isAdmin) && (
          <div className={classes.actions}>
            {!isAdmin && (
              <div className={`${classes.button} ${classes.buttonEdit}`} onClick={navigateEdit}>
                <Pencil className={classes.icon} /> <FormattedMessage id="app_edit" />
              </div>
            )}

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
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress color="warning" />
        </div>
      ) : (
        <div>
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
      )}

      <div className={classes.commentContainer}>
        <div className={classes.commentTitle}>Comments</div>
        {user && (
          <div className={classes.commentInputContainer}>
            <textarea
              className={classes.commentInput}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Comment something..."
            />
            <button type="button" className={classes.commentButton} onClick={handleCommentSubmit}>
              Comment
            </button>
            <div className={classes.divider} />
          </div>
        )}
        {comments?.length === 0 ? (
          <div className={classes.noComments}>No comments yet.</div>
        ) : (
          comments?.map((comment, index) => (
            <CommentBox
              key={index}
              comment={comment}
              postId={parseInt(postId, 10)}
              parentId={comment?.id}
              token={token}
              replies={comment?.replies}
            />
          ))
        )}
      </div>
    </div>
  );
};

PostDetail.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.bool,
  user: PropTypes.object,
  token: PropTypes.string,
  deleteSuccess: PropTypes.bool,
  comments: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  post: selectPost,
  loading: selectLoading,
  user: selectUser,
  token: selectToken,
  deleteSuccess: selectDeleteSuccess,
  comments: selectComments,
});

export default connect(mapStateToProps)(PostDetail);
