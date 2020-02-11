const joi = require('@hapi/joi');

const userSchema = joi.object().keys({
  firstName: joi
    .string()
    .trim()
    .max(25)
    .required(),
  lastName: joi
    .string()
    .trim()
    .max(25)
    .required(),
  photo: joi
    .string()
    .trim(),
  number: joi
    .string()
    .trim()
    .required()
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
  email: joi
    .email()
    .trim(),
  userName: joi
    .string()
    .max(20),
});

const groupChanelSchema = joi.object.keys({
  text: joi
    .string()
    .max(800)
    .required(),
  users: joi
    .required(),

  creator: joi
    .required(),
  admins: joi
    .required(),
});
