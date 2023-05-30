const Joi = require('joi')
module.exports.registerSchema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().min(4).required(),
})

module.exports.loginSchema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().min(4).required()
})