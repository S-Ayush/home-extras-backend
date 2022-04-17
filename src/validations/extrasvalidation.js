import Joi, { array } from "joi";

export const validateNewExtras = (payload) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(20).required(),
    price: Joi.string().min(0).required(),
  });

  return schema.validate(payload);
};
