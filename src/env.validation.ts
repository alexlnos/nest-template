import * as Joi from 'joi'

export const validationSchema = Joi.object({
    DATABASE_HOST: Joi.string().hostname().required(),
    DATABASE_PORT: Joi.number().port().required(),
    DATABASE_PORT_OUT: Joi.number().port().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_DB: Joi.string().required(),
    JWT_SECRET: Joi.string().min(8).required(),
    JWT_EXPIRES: Joi.string()
        .pattern(/^\d+[smhdwy]$/)
        .required(),
})
