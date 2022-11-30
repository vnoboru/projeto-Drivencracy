import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { choiceColl, pollsColl } from "../../index.js";

export async function postChoice(req, res) {
  const { title, pollId } = req.body;

  try {
    const existingPoll = await pollsColl.findOne({ _id: ObjectId(pollId) });

    if (!existingPoll) {
      return res.status(404).send("Não existe a enquete. ");
    }

    const choiceTitle = await choiceColl.findOne({ title });

    if (choiceTitle) {
      return res.status(409).send("Título já foi cadastrado. ");
    }

    if (dayjs(existingPoll.expireAt).valueOf() < Date.now()) {
      return res.status(403).send("Data da enquete está expirada. ");
    }

    await choiceColl.insertOne({ title: title, pollId: pollId });
    return res.status(201).send("Opção de voto criada com sucesso. ");
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function getChoice(req, res) {
  try {
    const id = req.params.id;
    const choicesData = await choiceColl.find({ pollId: id }).toArray();

    if (!choicesData.length) {
      return res.status(404).send("A enquete não existe. ");
    }

    return res.status(200).send(choicesData);
  } catch (err) {
    return res.status(500).send(err);
  }
}
