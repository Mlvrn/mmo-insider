import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import PostCard from '@components/PostCard';
import BackButton from '@components/BackButton';

import { selectAuthor, selectUserPosts } from './selectors';
import { getPostsByUsername, getUserByUsername } from './actions';

import classes from './style.module.scss';

const Profile = ({ userPosts, author }) => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserByUsername(username));
    dispatch(getPostsByUsername(username));
  }, [dispatch, username]);

  const isUser = author?.username === username;
  return (
    <div className={classes.container}>
      <div className={classes.profileContainer}>
        <BackButton />
        <div className={classes.profile}>
          <div className={classes.profileLeft}>
            <Avatar className={classes.avatar} src={`${import.meta.env.VITE_API_BASE_URL}${author?.avatar}`} />
            <div className={classes.userInfo}>
              <div>
                <div className={classes.username}>@{author?.username}</div>
                <div className={classes.email}>{author?.email}</div>
              </div>
              <div className={classes.bioContainer}>
                <div>
                  <FormattedMessage id="app_bio" />
                </div>
                <div className={classes.bio}>{author?.bio}</div>
              </div>
            </div>
          </div>
          {isUser && (
            <div className={classes.editButton} onClick={() => navigate('/profile/edit')}>
              <Pencil className={classes.editIcon} />
            </div>
          )}
        </div>
      </div>
      <div className={classes.postContainer}>
        {userPosts && userPosts.length > 0 ? (
          userPosts.map((post) => <PostCard key={post?.id} post={post} />)
        ) : (
          <div className={classes.noPost}>
            <FormattedMessage id="app_user_no_posts" />
          </div>
        )}
      </div>
    </div>
  );
};

Profile.propTypes = {
  userPosts: PropTypes.array,
  author: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userPosts: selectUserPosts,
  author: selectAuthor,
});

export default connect(mapStateToProps)(Profile);
