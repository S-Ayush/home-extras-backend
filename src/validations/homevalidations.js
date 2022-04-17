import Joi, { array } from "joi";

export const validateNewRecipe = (payload) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(20).required(),
    price: Joi.string().min(0).required(),
    location: Joi.string().min(2).required(),
    extras: { free: Joi.array(), paid: Joi.array() },
  });

  return schema.validate(payload);
};
