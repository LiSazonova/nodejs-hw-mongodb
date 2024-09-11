import Joi from "joi";

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'any.required': 'The "name" field is required.',
        'string.empty': 'The "name" field cannot be empty.'
    }),
    email: Joi.string().email().min(3).max(20).required().messages({
        'any.required': 'The "email" field is required.',
        'string.email': 'Invalid email format.',
        'string.empty': 'The "email" field cannot be empty.'
    }),
    password: Joi.string().min(3).max(20).required().messages({
        'any.required': 'The "password" field is required.',
        'string.min': 'The password must be at least 6 characters long.',
        'string.empty': 'The "password" field cannot be empty.'
    })
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});