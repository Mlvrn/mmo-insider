import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ArrowRight } from 'lucide-react';
import PostCard from '@components/PostCard';
import { selectUser } from '@containers/Client/selectors';
import { getAllPosts } from './actions';

import { selectPosts } from './selectors';

import classes from './style.module.scss';

const Home = ({ posts, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setToken(token));
    dispatch(getAllPosts());
  }, [dispatch]);

  const navigateAuth = () => {
    navigate('/auth');
  };

  return (
    <div className={classes.container}>
      {!user && (
        <div className={classes.heroContainer}>
          <div className={classes.hero}>
            <div className={classes.heroTitle}>
              <FormattedMessage id="app_hero_title" />
            </div>
            <div className={classes.heroSubtitle}>
              <FormattedMessage id="app_hero_subtitle" />
            </div>
            <div className={classes.heroDescription}>
              <FormattedMessage id="app_hero_description" />
            </div>
            <div className={classes.heroButton} onClick={navigateAuth}>
              <span>
                <FormattedMessage id="app_hero_button" />
              </span>
              <ArrowRight className={classes.buttonArrow} />
            </div>
          </div>
        </div>
      )}

      <div className={classes.sectionContainer}>
        <div>
          <div className={classes.sectionTitle}>The Latest from MMO Insider</div>
          <div className={classes.sectionSubtitle}>Stay informed with our informative articles.</div>
        </div>
        <div className={classes.postContainer}>
          {posts.map((post) => (
            <PostCard key={post?.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  posts: selectPosts,
  user: selectUser,
});

export default connect(mapStateToProps)(Home);
