import choiceSchema from "../schemas/choiceSchema.js";

export function choiceValidationMiddleware(req, res, next) {
  const { title, pollId } = req.body;

  const validation = choiceSchema.validate(
    { title, pollId },
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
