const joi = require('@hapi/joi');

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
