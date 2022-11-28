import pollSchema from "../schemas/pollSchema.js";

export function pollValidationMiddleware(req, res, next) {
  const { title, expireAt } = req.body;

  const validation = pollSchema.validate(
    { title, expireAt },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    res.status(422).send("Preencha os campos corretamente. ");
    console.log(errors);
    return;
  }
  next();
}
