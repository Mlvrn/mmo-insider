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
const {
  generateToken,
  generateVerificationToken,
  verifyToken,
} = require('../utils/jwt');
const { sendVerificationEmail } = require('../utils/nodemailer');

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
      isEmailVerified: false,
    });
    const verificationToken = generateVerificationToken(newUser);
    await newUser.update({ verificationToken });

    const verificationLink = `${process.env.BACKEND_BASE_URL}/api/user/verify-email?token=${newUser.verificationToken}`;

    sendVerificationEmail(email, verificationLink);

    return handleResponse(res, 201, newUser);
  } catch (error) {
    console.log(error);
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

    if (!user.isEmailVerified) {
      return handleResponse(res, 403, {
        message:
          'Your email address is not verified. Please check your email for the verification link.',
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

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);

    if (user && user.email === decoded.email) {
      user.isEmailVerified = true;
      user.verificationToken = null;
      await user.save();
      res.redirect(`${process.env.FRONTEND_BASE_URL}/verify-success`);
    } else {
      return handleResponse(res, 400, { message: 'Invalid token.' });
    }
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    return handleResponse(res, 200, response);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return handleResponse(res, 404, {
        message: 'User not found.',
      });
    }
    const { email, username, role } = user;

    return handleResponse(res, 200, { email, username, role });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
