import { Router } from "express";
import { createPoll, getPoll } from "../controllers/pollController.js";
import { pollValidationMiddleware } from "../middlewares/pollValidationMiddleware.js";

const pollRouter = Router();

pollRouter.post("/poll", pollValidationMiddleware, createPoll);
pollRouter.get("/poll", getPoll);

export default pollRouter;
