import joi from "joi";
import JoiDate from "@joi/date";

const Joi = joi.extend(JoiDate);

const pollSchema = joi.object({
  title: joi.string().required(),
  expireAt: Joi.date().format(`YYYY-MM-DD HH:mm`),
});

export default pollSchema;
