import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale, selectTheme } from '@containers/App/selectors';

import classes from './style.module.scss';

const AuthLayout = ({ children }) => <div className={classes.layout}>{children}</div>;

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
});

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default injectIntl(connect(mapStateToProps)(AuthLayout));
