import * as joi from 'joi';

export const bookingValidator = joi.object().keys({
    code: joi.string().trim().required().messages({
        'string.base': 'Code must be a string',
        'string.empty': 'Code is required',
        'any.required': 'Code is required',
    }),
    name: joi.string().trim().required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'any.required': 'Name is required',
    })
})
