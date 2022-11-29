import express from "express";
import cors from "cors";
import db from "./src/db.js";
import pollRoutes from "./src/routes/pollRoutes.js";
import choiceRoutes from "./src/routes/choiceRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

export const pollsColl = db.collection("poll");
export const choiceColl = db.collection("choice");

app.use(pollRoutes);
app.use(choiceRoutes);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
