const {
  handleResponse,
  handleServerError,
} = require('../utils/responseHandler');
const {
  registerValidator,
  loginValidator,
} = require('../validators/user.validator');
const { User } = require('../models');
const { Op } = require('sequelize');
const { comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const userData = req.body;

    const { error, value } = registerValidator.validate(userData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }
    const { username, email, password } = value;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });
    if (existingUser) {
      return handleResponse(res, 400, {
        message: 'Username or email already exists',
      });
    }

    const newUser = await User.create({
      username,
      password,
      email,
      role: 2,
    });

    return handleResponse(res, 201, newUser);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.login = async (req, res) => {
  try {
    const userData = req.body;

    const { error, value } = loginValidator.validate(userData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const { email, password } = value;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return handleResponse(res, 400, {
        message: 'Invalid email or password.',
      });
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return handleResponse(res, 400, {
        message: 'Invalid email or password.',
      });
    }

    return handleResponse(res, 200, {
      token: generateToken(user),
      message: 'Login Successful!',
    });
  } catch (error) {
    return handleServerError(res);
  }
};
