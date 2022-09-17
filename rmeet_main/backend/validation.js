//Validation
const Joi = require('@hapi/joi')

const registerValidation = (data) => {
  const schema = Joi.object({
    // userName: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    userName: Joi.string(),
    gender: Joi.string(),
    bio: Joi.string(),
    major: Joi.string(),
    profileImg: Joi.string(),
  })
  return schema.validate(data)
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return schema.validate(data)
}

const passwordValidate = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
  })
  return schema.validate(data)
}

const postValidate = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(64).required(),
    content: Joi.string().min(6).max(2048).required(),
    semester: Joi.string().min(1).required(),
    year: Joi.number().required(),
    like: Joi.number(),
  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.passwordValidate = passwordValidate
module.exports.postValidate = postValidate
