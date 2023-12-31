import PropTypes from 'prop-types';
import { AlternateEmail, Key, Person } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';

import { registerUser } from '@containers/Client/actions';

import FormInput from '@components/FormInput.jsx';

import classes from './style.module.scss';

const RegisterForm = ({ isRightPanelActive, handleOnClick, intl: { formatMessage } }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const handleSuccess = () => {
      toast.success('Registration successful! Please check your email for a verification link', { duration: 5000 });
      handleOnClick('login');
    };
    dispatch(registerUser(data, handleSuccess));
  };

  return (
    <div className={`${classes.formContainer} ${isRightPanelActive ? classes.show : ''}`}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <h1 className={classes.formTitle}>
          <FormattedMessage id="app_create_your_account" />
        </h1>
        <div className={classes.formInputContainer}>
          <div>
            <p className={classes.formInputLabel}>
              <FormattedMessage id="app_username" />
            </p>
            <FormInput
              type="text"
              name="username"
              placeholder={formatMessage({ id: 'app_username' })}
              icon={<Person />}
              {...register('username')}
            />
          </div>
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
          <div>
            <p className={classes.formInputLabel}>
              <FormattedMessage id="app_confirm_password" />
            </p>
            <FormInput
              type="password"
              name="confirmPassword"
              placeholder={formatMessage({ id: 'app_confirm_password' })}
              icon={<Key />}
              {...register('confirmPassword')}
            />
          </div>
        </div>

        <button className={classes.formButton} type="submit">
          <FormattedMessage id="app_register" />
        </button>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {
  isRightPanelActive: PropTypes.bool,
  handleOnClick: PropTypes.func,
  intl: PropTypes.object,
};

export default injectIntl(RegisterForm);
