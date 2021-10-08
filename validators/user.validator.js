const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');
const userRoles = require('../configs/user-roles.enum');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    role: Joi.string().allow(...Object.values(userRoles)),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required(),
});


module.exports = {
    createUserValidator
};
