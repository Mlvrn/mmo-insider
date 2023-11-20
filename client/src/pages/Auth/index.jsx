import LoginForm from '@components/LoginForm';
import RegisterForm from '@components/RegisterForm';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import classes from './style.module.scss';

const AuthPage = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('login');
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const navigateHome = () => {
    navigate('/');
  };

  const containerClass = `${classes.container} ${type === 'register' ? classes.rightPanelActive : ''}`;
  return (
    <div className={classes.page}>
      <h2 className={classes.title}>
        {type === 'register' ? <FormattedMessage id="app_register" /> : <FormattedMessage id="app_login" />} to{' '}
        <span className={classes.logo} onClick={navigateHome}>
          <FormattedMessage id="app_title_header" />
        </span>
      </h2>
      <div className={containerClass} id="container">
        <LoginForm isRightPanelActive={type === 'login'} />
        <RegisterForm isRightPanelActive={type === 'register'} handleOnClick={handleOnClick} />

        <div className={classes.overlayContainer}>
          <div className={classes.overlay}>
            <div className={`${classes.overlayPanel} ${classes.overlayLeft}`}>
              <div className={classes.content}>
                <h1 className={classes.contentTitle}>
                  <FormattedMessage id="app_register_title" />
                </h1>
                <p className={classes.contentSubtitle}>
                  <FormattedMessage id="app_register_subtitle" />
                </p>
                <div>
                  <p className={classes.contentText}>
                    <FormattedMessage id="app_register_to_login" />
                  </p>
                  <button
                    type="button"
                    className={classes.contentButton}
                    id="login"
                    onClick={() => handleOnClick('login')}
                  >
                    <FormattedMessage id="app_login" />
                  </button>
                </div>
              </div>
            </div>
            <div className={`${classes.overlayPanel} ${classes.overlayRight}`}>
              <div className={classes.content}>
                <h1 className={classes.contentTitle}>
                  <FormattedMessage id="app_login_title" />
                </h1>
                <p className={classes.contentSubtitle}>
                  <FormattedMessage id="app_login_subtitle" />
                </p>

                <div>
                  <p className={classes.contentText}>
                    <FormattedMessage id="app_login_to_register" />
                  </p>
                  <button
                    type="button"
                    className={classes.contentButton}
                    id="register"
                    onClick={() => handleOnClick('register')}
                  >
                    <FormattedMessage id="app_register_now" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
