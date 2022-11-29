import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { choiceColl, pollsColl } from "../../index.js";

export async function postChoice(req, res) {
  const { title, pollId } = req.body;

  try {
    const existingPoll = await pollsColl.findOne({ _id: ObjectId(pollId) });
    console.log(dayjs(existingPoll.expireAt).valueOf());
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

    /*await choiceColl.insertOne({ title: title, pollId: pollId });
    return res.status(201).send("Opção de voto criada com sucesso. ");*/
  } catch (err) {
    return res.status(500).send(err);
  }
}
