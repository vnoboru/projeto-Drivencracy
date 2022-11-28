import { Router } from "express";
import { createPoll } from "../controllers/pollController.js";
import { pollValidationMiddleware } from "../middlewares/pollValidationMiddleware.js";

const pollRouter = Router();

pollRouter.post("/poll", pollValidationMiddleware, createPoll);

export default pollRouter;
