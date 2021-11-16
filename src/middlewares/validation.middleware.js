import Joi from 'joi';

export const newFormValidation = (req, res, next) => {
  const schema = Joi.object({
    fname: Joi.string().alphanum().max(30).required(),
    lname: Joi.string().alphanum().max(30).required(),
    dob: Joi.date().allow('').allow(null),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().min(6).max(50).required(),
    phone: Joi.string().max(15),
    address: Joi.string().max(50),
    gender: Joi.string().max(6).allow('').allow(null),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.json({
      status: 'error',
      message: result.error.message,
    });
  }
  next();
};
