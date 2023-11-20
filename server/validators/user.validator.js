const Joi = require('joi');

const registerValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required().messages({
    'string.base': 'Username must be a string',
    'string.alphanum': 'Username must only contain alphanumeric characters',
    'string.min': 'Username must be at least {#limit} characters long',
    'string.max': 'Username cannot be more than {#limit} characters long',
    'string.empty': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password length must be at least {#limit} characters long',
    'string.empty': 'Password is required',
  }),
  confirmPassword: Joi.string().min(8).valid(Joi.ref('password')).messages({
    'any.only': 'Password and Confirm Password must match',
  }),
});

const loginValidator = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

const changePasswordValidator = Joi.object({
  oldPassword: Joi.string().required().messages({
    'string.empty': 'Old password is required',
  }),
  newPassword: Joi.string().min(8).required().messages({
    'string.min': 'New password must be at least {#limit} characters long',
    'string.empty': 'New password is required',
  }),
});

module.exports = {
  registerValidator,
  loginValidator,
  changePasswordValidator,
};
