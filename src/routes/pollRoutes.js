import { Router } from "express";
import { postPoll, getPoll } from "../controllers/pollController.js";
import { pollValidationMiddleware } from "../middlewares/pollValidationMiddleware.js";

const pollRouter = Router();

pollRouter.post("/poll", pollValidationMiddleware, postPoll);
pollRouter.get("/poll", getPoll);

export default pollRouter;
