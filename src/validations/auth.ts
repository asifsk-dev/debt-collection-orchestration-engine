import { Joi } from 'express-validation';

// Schema for user login
const loginUserValidation = {
  body: Joi.object({
    email: Joi.string().trim().email().required().messages({
      'string.empty': 'Email can\'t be empty',
      'string.email': 'Email must be valid',
    }),
    password: Joi.string().trim().min(6).required().messages({
      'string.empty': 'Password can\'t be empty',
      'string.min': 'Password must be at least 6 characters',
    }),
  }).required().messages({
      'object.base': 'Request body must be a valid object',
  }),
};

export { loginUserValidation };   