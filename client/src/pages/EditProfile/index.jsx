import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import { selectCurrentUser, selectToken } from '@containers/Client/selectors';

import { AddAPhoto } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { AtSign, ScrollText, User } from 'lucide-react';
import BackButton from '@components/BackButton';

import { getUserById } from '@containers/Client/actions';
import { editProfile } from './actions';

import classes from './style.module.scss';

const EditProfile = ({ user, token, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(user?.avatar);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserById(token));
  }, [dispatch, token]);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    if (fileInputRef.current?.files[0]) {
      formData.append('avatar', fileInputRef.current.files[0]);
    }
    formData.append('username', username);
    formData.append('email', email);
    formData.append('bio', bio);

    dispatch(editProfile(formData, token));
  };
  return (
    <div className={classes.page}>
      <div className={classes.back}>
        <BackButton />
      </div>
      <div className={classes.container}>
        <div className={classes.containerHeader}>
          <FormattedMessage id="app_edit_profile" />
        </div>
        <div className={classes.content}>
          <div className={classes.left}>
            <div className={classes.avatarContainer} onClick={handleAvatarClick}>
              {avatar ? (
                <img
                  src={avatar.startsWith('blob') ? avatar : `${import.meta.env.VITE_API_BASE_URL}${avatar}`}
                  alt="Avatar"
                  className={classes.avatar}
                />
              ) : (
                <IconButton className={classes.avatarIcon}>
                  <AddAPhoto className={classes.addPhotoIcon} />
                </IconButton>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
                accept="image/*"
              />
            </div>
            <button
              type="button"
              className={classes.changePassword}
              onClick={() => navigate('/profile/change-password')}
            >
              <FormattedMessage id="app_change_password" />
            </button>
          </div>
          <div className={classes.formContainer}>
            <div className={classes.upperFormContainer}>
              <div className={classes.inputContainer}>
                <div className={classes.label}>
                  <User /> <FormattedMessage id="app_username" />
                </div>
                <input
                  className={classes.input}
                  placeholder={formatMessage({ id: 'app_username' })}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={classes.inputContainer}>
                <div className={classes.label}>
                  <AtSign /> <FormattedMessage id="app_email" />
                </div>
                <input
                  className={classes.input}
                  placeholder={formatMessage({ id: 'app_email_placeholder' })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.inputContainer}>
              <div className={classes.label}>
                <ScrollText />
                <FormattedMessage id="app_bio" />
              </div>
              <textarea
                className={`${classes.input} ${classes.bio}`}
                placeholder={formatMessage({ id: 'app_bio_placeholder' })}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <button type="button" className={classes.button} onClick={handleSubmit}>
              <FormattedMessage id="app_save" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(EditProfile));
