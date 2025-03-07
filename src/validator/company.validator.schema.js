import Joi from 'joi';

export const companyValidationSchema = {
    body:Joi.object({
        companyName: Joi.string().required().messages({'companyName':'company name validation'}),
        description: Joi.string(),
        industry: Joi.string(),
        address: Joi.string(),
        numberOfEmployees: Joi.number().min(11).max(20).optional().messages({'number':'number validation'}),
        companyEmail: Joi.string().email().messages({'string.email':'company email validation'}),
        createdBy: Joi.string().messages({'string':'createdBy validation'}),
        logo: Joi.object({
            URLS: Joi.array().items(
                Joi.object({
                    secure_url: Joi.string().optional(),
                    public_id: Joi.string().optional(),
                })
            ).optional(),
            folderId: Joi.string().optional(),
        }).optional(),
        coverPic: Joi.object({
            URLS: Joi.array().items(
                Joi.object({
                    secure_url: Joi.string().optional(),
                    public_id: Joi.string().optional(),
                })
            ).optional(),
            folderId: Joi.string().optional(),
        }).optional(),
        HRs: Joi.array().items(
            Joi.string().messages({'string':'HR validation'})
        ).optional(),
        bannedAt: Joi.date().allow(null).optional(),
        deletedAt: Joi.date().allow(null).optional(),
        legalAttachment: Joi.object({
            secure_url: Joi.string().allow(null).optional(),
            public_id: Joi.string().allow(null).optional(),
        }).optional(),
        approvedByAdmin: Joi.boolean().default(false),
    })
}

