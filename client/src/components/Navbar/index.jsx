import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LogOut, Plus, Swords } from 'lucide-react';

import CreatePostButton from '@components/CreatePostButton';

import { setLocale } from '@containers/App/actions';

import { IconButton } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '@containers/Client/selectors';
import { logoutUser } from '@containers/Client/actions';

import classes from './style.module.scss';

const Navbar = ({ title, locale, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(menuPosition);
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 500) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener('scroll', changeColor);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  const navigateAuth = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigateAuth();
  };

  const navigateCreate = () => {
    navigate('/post/create');
  };

  return (
    <div
      className={color ? `${classes.headerWrapper} ${classes.headerWrapperBg}` : ` ${classes.headerWrapper} `}
      data-testid="navbar"
    >
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <Swords className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.toolbar}>
          {user && <CreatePostButton />}
          {!user && (
            <div className={classes.authButton} onClick={navigateAuth}>
              <FormattedMessage id="app_join_us" />
            </div>
          )}
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
          {user && (
            <IconButton onClick={handleAvatarClick}>
              <Avatar className={classes.avatarUser} src="https://source.unsplash.com/500x500/?avatar" />
            </IconButton>
          )}
          <Menu
            className={classes.dropdownAvatar}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAvatarClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <div className={classes.userData}>
              <div className={classes.username}>{user?.username}</div>
              <div className={classes.email}>{user?.email}</div>
            </div>
            <div className={classes.divider} />
            <MenuItem onClick={navigateCreate} className={classes.dropdownAvatar__item}>
              <Plus className={classes.dropdownIcon} />
              <div className={classes.dropdownText}>
                <FormattedMessage id="app_new_post" />
              </div>
            </MenuItem>
            <MenuItem onClick={handleLogout} className={classes.dropdownAvatar__item}>
              <LogOut className={`${classes.dropdownIcon} ${classes.logoutIcon}`} />
              <div className={`${classes.dropdownText} ${classes.logoutText}`}>
                <FormattedMessage id="app_logout" />
              </div>
            </MenuItem>
          </Menu>
        </div>
        <Menu
          open={open}
          anchorEl={menuPosition}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          className={classes.dropdownLang}
        >
          <MenuItem
            onClick={() => onSelectLang('id')}
            selected={locale === 'id'}
            className={classes.dropdownLang__item}
          >
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/id.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_id" />
              </div>
            </div>
          </MenuItem>
          <MenuItem
            onClick={() => onSelectLang('en')}
            selected={locale === 'en'}
            className={classes.dropdownLang__item}
          >
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/en.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_en" />
              </div>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(Navbar);
