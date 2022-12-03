import { choiceColl, pollsColl, voteColl } from "../../index.js";
import { ObjectId } from "mongodb";

export async function getResult(req, res) {
  const id = req.params.id;

  try {
    const poll = await pollsColl.findOne({ _id: ObjectId(id) });

    if (!poll) {
      return res.status(404).send("Essa enquete não existe. ");
    }

    const choices = await choiceColl.find({ pollId: id }).toArray();
    const votes = [];
    const numberOfVotes = [];

    for (let i = 0; i < choices.length; i++) {
      votes[i] = await voteColl
        .find({ choiceId: choices[i]._id.toString() })
        .toArray();
      numberOfVotes[i] = votes[i].length;
    }

    const highestNumberOfVotes = Math.max(...numberOfVotes);
    const winnerPosition = numberOfVotes.indexOf(highestNumberOfVotes);
    const result = {
      _id: id,
      title: poll.title,
      expireAt: poll.expireAt,
      result: {
        title: choices[winnerPosition].title,
        votes: highestNumberOfVotes,
      },
    };

    return res.send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
}
