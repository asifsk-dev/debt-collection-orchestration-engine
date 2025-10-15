import { Joi } from 'express-validation';

// Schema for user login
const getCaseSchema = {
  query: Joi.object({
    assigned_to: Joi.number().integer().positive().optional().messages({
      'number.base': '`Assigned To` must be a number',
      'number.integer': '`Assigned To` must be an integer',
      'number.positive': '`Assigned To` must be a positive number',
    }),
  })
};

const updateCaseSchema = {
  params: Joi.object({
    case_id: Joi.number().integer().positive().required().messages({
      'number.base': '`Case ID` must be a number',
      'number.integer': '`Case ID` must be an integer',
      'number.positive': '`Case ID` must be a positive number',
      'any.required': '`Case ID` is required',
    }),
  }),
  body: Joi.object({
    status: Joi.string().trim().required().valid('Pending', 'In Progress', 'Resolved', 'Escalated').messages({
      'any.required': '`Status` is required',
      'string.base': '`Status` must be a string',
      'any.only': '`Status` must be one of [Pending, In Progress, Resolved, Escalated]',
      'string.empty': '`Status` cannot be empty',
    }),
    comment: Joi.string().trim().optional().max(255).messages({
      'string.base': '`comment` must be a string',
      'string.empty': '`Status` cannot be empty',
      'string.max': '`Status` cannot be more than 255'
    })
  })
};

export { getCaseSchema, updateCaseSchema };   