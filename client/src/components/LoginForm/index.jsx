import PropTypes from 'prop-types';
import { AlternateEmail, Key } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';

import { loginUser } from '@containers/Client/actions';
import FormInput from '@components/FormInput.jsx';

import classes from './style.module.scss';

const LoginForm = ({ isRightPanelActive, intl: { formatMessage } }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };
  return (
    <div className={`${classes.formContainer} ${!isRightPanelActive ? `${classes.show}` : ''}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <h1 className={classes.formTitle}>
          <FormattedMessage id="app_login" />
        </h1>
        <div className={classes.formInputContainer}>
          <div>
            <p className={classes.formInputLabel}>
              <FormattedMessage id="app_email" />
            </p>
            <FormInput
              type="email"
              name="email"
              placeholder={formatMessage({ id: 'app_email' })}
              icon={<AlternateEmail />}
              {...register('email')}
            />
          </div>
          <div>
            <p className={classes.formInputLabel}>
              <FormattedMessage id="app_password" />
            </p>
            <FormInput
              type="password"
              name="password"
              placeholder={formatMessage({ id: 'app_password' })}
              icon={<Key />}
              {...register('password')}
            />
          </div>
        </div>
        <div className={classes.formFooter}>
          <button className={classes.formButton} type="submit">
            <FormattedMessage id="app_login" />
          </button>
          <a href="#" className={classes.forgot}>
            <FormattedMessage id="app_forgot_password" />
          </a>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  isRightPanelActive: PropTypes.bool,
  intl: PropTypes.object,
};

export default injectIntl(LoginForm);
