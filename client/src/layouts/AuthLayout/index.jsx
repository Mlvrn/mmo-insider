import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { setLocale } from '@containers/App/actions';
import { selectLocale, selectTheme } from '@containers/App/selectors';

import classes from './style.module.scss';

const AuthLayout = ({ children, locale }) => {
  const dispatch = useDispatch();
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };
  return (
    <div className={classes.layout}>
      <div className={classes.toggle} onClick={handleClick}>
        <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
        <div className={classes.lang}>{locale}</div>
        <ExpandMoreIcon />
      </div>

      {children}
      <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
        <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'} className={classes.dropdown}>
          <div className={classes.menu}>
            <Avatar className={classes.menuAvatar} src="/id.png" />
            <div className={classes.menuLang}>
              <FormattedMessage id="app_lang_id" />
            </div>
          </div>
        </MenuItem>
        <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'} className={classes.dropdown}>
          <div className={classes.menu}>
            <Avatar className={classes.menuAvatar} src="/en.png" />
            <div className={classes.menuLang}>
              <FormattedMessage id="app_lang_en" />
            </div>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
});

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string.isRequired,
};

export default injectIntl(connect(mapStateToProps)(AuthLayout));
