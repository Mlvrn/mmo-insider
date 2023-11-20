import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { ArrowRight } from 'lucide-react';

import classes from './style.module.scss';

const Home = () => {
  const navigate = useNavigate();

  const navigateAuth = () => {
    navigate('/auth');
  };
  return (
    <div className={classes.container}>
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
        <div className={classes.sectionContainer}>
          <div className={classes.sectionTitle}>Latest News</div>
          <div className={classes.postContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
