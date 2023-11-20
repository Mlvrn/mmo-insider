import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import classes from './style.module.scss';

const FormInput = forwardRef(({ type, name, placeholder, icon, ...rest }, ref) => (
  <div className={classes.inputContainer}>
    <div className={classes.icon}>{icon}</div>
    <input className={classes.formInput} type={type} name={name} placeholder={placeholder} ref={ref} {...rest} />
  </div>
));
FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
};

export default FormInput;
