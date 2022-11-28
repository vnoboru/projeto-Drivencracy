import { pollsColl } from "../../index.js";
import db from "../db.js";
import dayjs from "dayjs";

export async function createPoll(req, res) {
  const { title, expireAt } = req.body;

  try {
    const checkPoll = await pollsColl.findOne({ title });
    if (checkPoll) {
      return res.status(409).send("Título do questionário da joi cadastrado. ");
    }

    if (!expireAt) {
      const format = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");
      await pollsColl.insertOne({ title: title, expireAt: format });
      return res.status(201).send("Questionário criado com sucesso! ");
    }

    await pollsColl.insertOne({ title: title, expireAt: expireAt });
    return res.status(201).send("Questionário criado com sucesso! ");
  } catch (err) {
    return res.status(500).send("Não foi possível criar o questionário! ");
  }
}

export async function getPoll(req, res) {
  try {
    const pollsData = await pollsColl.find().toArray();
    return res.status(200).send(pollsData);
  } catch (err) {
    return res.status(500).send(err);
  }
}
