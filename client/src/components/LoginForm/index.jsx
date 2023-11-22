import PropTypes from 'prop-types';
import { AlternateEmail, Key } from '@mui/icons-material';
import { connect, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { forgotPasswordRequest, loginUser } from '@containers/Client/actions';
import FormInput from '@components/FormInput.jsx';

import { selectLogin } from '@containers/Client/selectors';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

import classes from './style.module.scss';
import toast from 'react-hot-toast';

const LoginForm = ({ isRightPanelActive, intl: { formatMessage }, login }) => {
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = watch('email');

  useEffect(() => {
    if (login) {
      navigate('/');
    }
  }, [login, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const handleForgotPassword = () => {
    console.log(email);
    if (email) {
      dispatch(forgotPasswordRequest(email));
    } else {
      toast.error('Forgot password? More like forgot email');
    }
  };

  return (
    <div className={`${classes.formContainer} ${!isRightPanelActive ? `${classes.show}` : ''}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <h1 className={classes.formTitle}>
          {login} <FormattedMessage id="app_login" />
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
          <button type="button" className={classes.forgot} onClick={handleForgotPassword}>
            <FormattedMessage id="app_forgot_password" />
          </button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  isRightPanelActive: PropTypes.bool,
  intl: PropTypes.object,
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default injectIntl(connect(mapStateToProps)(LoginForm));
