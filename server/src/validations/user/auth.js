const Joi = require('joi');

const registerSchema = Joi.object({
    userName: Joi.string()
        .min(1)
        .max(50)
        .required(),
    userEmail: Joi.string()
        .email()
        .required(),
    userPassword: Joi.string()
        .min(4)
        .required(),
    userPhoneNumber: Joi.string()
        .pattern(/^[0-9]+$/)
        .required()
});

const loginSchema = Joi.object({
    userEmail: Joi.string()
        .email()
        .required(),
    userPassword: Joi.string()
        .min(4)
        .required(),
});

const updateSchema = Joi.object({
    userName: Joi.string()
        .min(1)
        .max(50)
        .required(),
    userEmail: Joi.string()
        .email()
        .required(),
    userPhoneNumber: Joi.string()
        .pattern(/^[0-9]+$/)
        .required()
})

module.exports = { registerSchema, loginSchema , updateSchema };