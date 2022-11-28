import express from "express";
import cors from "cors";
import db from "./src/db.js";
import pollRoutes from "./src/routes/pollRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

export const pollsColl = db.collection("poll");

app.use(pollRoutes);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
