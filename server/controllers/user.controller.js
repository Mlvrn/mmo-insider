const {
  handleResponse,
  handleServerError,
} = require('../utils/responseHandler');
const {
  registerValidator,
  loginValidator,
  editProfileValidator,
  changePasswordValidator,
} = require('../validators/user.validator');
const { User, Post } = require('../models');
const { Op, Sequelize } = require('sequelize');
const { comparePassword, hashPassword } = require('../utils/bcrypt');
const fs = require('fs');
const path = require('path');
const {
  generateToken,
  generateVerificationToken,
  verifyToken,
} = require('../utils/jwt');
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require('../utils/nodemailer');

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

    const hashedPassword = hashPassword(password);

    const newUser = await User.create({
      username,
      password: hashedPassword,
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
    const { email, username, role, avatar, bio } = user;

    return handleResponse(res, 200, { email, username, role, avatar, bio });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'username', 'email', 'avatar', 'createdAt', 'bio'],
    });

    if (!user) {
      return handleResponse(res, 404, { message: 'User not found.' });
    }

    return handleResponse(res, 200, { user });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return handleResponse(res, 404, { message: 'Email not registered.' });
    }

    const temporaryPassword = 'supersecretpass123';

    const hashedPassword = hashPassword(temporaryPassword);
    await user.update({ password: hashedPassword });

    await sendPasswordResetEmail(email, temporaryPassword);

    return handleResponse(res, 200, {
      message: 'Temporary password sent via email',
    });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return handleResponse(res, 404, { message: 'User not found.' });
    }

    await user.destroy();

    return handleResponse(res, 200, {
      deletedUser: user,
      message: 'User deleted successfully.',
    });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.editProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;

    const { error, value } = editProfileValidator.validate(profileData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const { username, email, bio } = value;

    const currentUser = await User.findOne({ where: { id: userId } });
    if (!currentUser) {
      return handleResponse(res, 404, { message: 'User not found' });
    }

    let avatarPath;
    if (req.file) {
      avatarPath = `/uploads/${req.file.filename}`;

      if (currentUser.avatar) {
        const oldAvatarPath = path.join(__dirname, '..', currentUser.avatar);
        fs.unlink(oldAvatarPath, (err) => {
          if (err) console.error('Failed to delete old avatar image:', err);
        });
      }
    }

    await User.update(
      {
        username,
        email,
        bio,
        avatar: avatarPath || Sequelize.literal('avatar'),
      },
      { where: { id: userId } }
    );

    const updatedUser = await User.findOne({ where: { id: userId } });

    return handleResponse(res, 200, {
      user: updatedUser,
      message: 'Profile updated successfully!',
    });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const { error, value } = changePasswordValidator.validate({
      currentPassword,
      newPassword,
    });

    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const user = await User.findByPk(userId);

    const isPasswordMatch = await comparePassword(
      value.currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return handleResponse(res, 401, {
        message: 'Current password is incorrect',
      });
    }

    const hashedNewPassword = hashPassword(value.newPassword);
    await user.update({ password: hashedNewPassword });

    return handleResponse(res, 200, {
      message: 'Password changed successfully',
    });
  } catch (error) {
    return handleServerError(res);
  }
};
