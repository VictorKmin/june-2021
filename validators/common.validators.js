const Joi = require("joi");

module.exports = {
    languageValidator: {
        en: Joi.string(),
        fr: Joi.string(),
        sp: Joi.string()
    },

    nameValidator: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
};
