const Joi = require('joi');

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');
const userRoles = require('../configs/user-roles.enum');
const CV = require('./common.validators');

const userLangugeValidator = {
    fr: Joi.string(),
    sp: Joi.string(),
    gs: Joi.string(),
    gsada: Joi.string(),
};

const createUserValidator = Joi.object({
    name: CV.nameValidator.required(),
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
    language: CV.languageValidator,
    ...userLangugeValidator
});

// const updateUserValidator = Joi.object({
//     name: CV.nameValidator,
//     email: Joi
//         .string()
//         .regex(EMAIL_REGEXP)
//         .trim(),
//     role: Joi.string().allow(...Object.values(userRoles)),
// });


module.exports = {
    createUserValidator
};
