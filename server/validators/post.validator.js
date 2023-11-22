const Joi = require('joi');

const createPostValidator = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least {#limit} characters long',
    'string.empty': 'Title is required',
  }),
  shortDescription: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
  }),
  content: Joi.string().min(30).required().messages({
    'string.empty': 'Content is required',
    'string.min': 'Content must be at least {#limit} characters long',
  }),
  mainImage: Joi.string(),
});

module.exports = {
  createPostValidator,
};
