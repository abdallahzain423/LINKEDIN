import Joi from 'joi';
import { genderEnum, otpType, providersEnum, roleEnum } from '../constants/constants.js';

export const userValidationSchema = { 
    body:Joi.object({
    firstName: Joi.string().required().messages({firstname : 'first name validation'}),
    lastName: Joi.string().required().messages({lastname : 'last name validation'}),
    username: Joi.string().optional(), 
    email: Joi.string().email().required().messages({email : 'email validation'}),
    password: Joi.string().min(6).required().messages({password : 'password validation'}),
    provider: Joi.string().valid(...Object.values(providersEnum)).default(providersEnum.SYSTEM),
    gender: Joi.string().valid(...Object.values(genderEnum)).optional(),
    DOB: Joi.date().optional(),
    mobileNumber: Joi.string().required().messages({mobileNumber : 'mobile number validation'}),
    Role: Joi.string().valid(...Object.values(roleEnum)).default(roleEnum.USER),
    isconfirmed: Joi.boolean().default(false),
    deletedAt: Joi.date().optional(),
    pannedAt: Joi.date().optional(),
    updatedBy: Joi.string(),
    profilepicture: Joi.object({
        secure_url: Joi.string().optional(),
        public_id: Joi.string().optional(),
    }).optional(),
    coverpicture: Joi.array().items(
        Joi.object({
            secure_url: Joi.string().optional(),
            public_id: Joi.string().optional(),
        })
    ).optional(),
    OTP: Joi.array().items(
        Joi.string().valid(...Object.values(otpType))
    ).optional(),
}
    )
}

