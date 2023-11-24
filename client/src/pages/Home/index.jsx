import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ArrowRight } from 'lucide-react';
import { Pagination } from '@mui/material';

import PostCard from '@components/PostCard';
import SearchBar from '@components/SearchBar';

import { selectUser } from '@containers/Client/selectors';
import { getAllPosts, getPaginatedPosts } from './actions';
import { selectAllPosts, selectCurrentPage, selectPosts, selectTotalPages } from './selectors';

import classes from './style.module.scss';

const Home = ({ allPosts, posts, user, totalPages, currentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const postPerPage = 5;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaginatedPosts(1, postPerPage));
    dispatch(getAllPosts());
  }, [dispatch]);

  const handlePageChange = (event, page) => {
    dispatch(getPaginatedPosts(page, postPerPage));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPosts = searchTerm
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) || post.shortDescription.toLowerCase().includes(searchTerm)
      )
    : posts;

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
        <div className={classes.sectionHeader}>
          <div>
            <div className={classes.sectionTitle}>
              <FormattedMessage id="app_home_title" />
            </div>
            <div className={classes.sectionSubtitle}>
              <FormattedMessage id="app_home_subtitle" />
            </div>
          </div>
          <SearchBar onChange={handleSearchChange} />
        </div>
        <div className={classes.postContainer}>
          {filteredPosts.map((post) => (
            <PostCard key={post?.id} post={post} />
          ))}
          {!searchTerm && (
            <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
              className={classes.pagination}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  allPosts: PropTypes.array,
  posts: PropTypes.array,
  user: PropTypes.object,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  allPosts: selectAllPosts,
  posts: selectPosts,
  user: selectUser,
  totalPages: selectTotalPages,
  currentPage: selectCurrentPage,
});

export default connect(mapStateToProps)(Home);
