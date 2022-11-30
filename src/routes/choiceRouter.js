import { Router } from "express";
import { getChoice, postChoice } from "../controllers/choiceController.js";
import { choiceValidationMiddleware } from "../middlewares/choiceValidationMiddleware.js";

const choiceRouter = Router();

choiceRouter.post("/choice", choiceValidationMiddleware, postChoice);
choiceRouter.get("/poll/:id/choice", getChoice);

export default choiceRouter;
