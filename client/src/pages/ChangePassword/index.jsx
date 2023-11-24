import PropTypes from 'prop-types';
import { KeyRound, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectToken } from '@containers/Client/selectors';
import { FormattedMessage, injectIntl } from 'react-intl';

import BackButton from '@components/BackButton';

import { changePassword } from './actions';

import classes from './style.module.scss';

const ChangePassword = ({ token, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      currentPassword,
      newPassword,
    };
    dispatch(changePassword(data, token));
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <div className={classes.formContainer}>
        <div className={classes.title}>
          <FormattedMessage id="app_change_password" />
        </div>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formGroup}>
            <div className={classes.formLabel}>
              <FormattedMessage id="app_current_password" />
            </div>
            <div className={classes.formInput}>
              <LockKeyhole className={classes.icon} />
              <input
                type="password"
                placeholder={formatMessage({ id: 'app_current_password' })}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={classes.input}
              />
            </div>
          </div>
          <div className={classes.formGroup}>
            <div className={classes.formLabel}>
              <FormattedMessage id="app_new_password" />
            </div>
            <div className={classes.formInput}>
              <KeyRound className={classes.icon} />
              <input
                type="password"
                placeholder={formatMessage({ id: 'app_new_password' })}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={classes.input}
              />
            </div>
          </div>
          <button type="submit" className={classes.submitButton}>
            <FormattedMessage id="app_change_password" />
          </button>
        </form>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {
  token: PropTypes.string,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(ChangePassword));
