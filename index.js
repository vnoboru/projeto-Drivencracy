import express from "express";
import cors from "cors";
import db from "./src/db.js";
import pollRouter from "./src/routes/pollRouter.js";
import choiceRouter from "./src/routes/choiceRouter.js";
import voteRouter from "./src/routes/voteRouter.js";
import resultRouter from "./src/routes/resultRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

export const pollsColl = db.collection("poll");
export const choiceColl = db.collection("choice");
export const voteColl = db.collection("vote");

app.use(pollRouter);
app.use(choiceRouter);
app.use(voteRouter);
app.use(resultRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
