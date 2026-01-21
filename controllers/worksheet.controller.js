import { v4 as uuidv4 } from "uuid";
import db from "../models/index.js";
import { getBearerToken } from "../utils.js";

const { Task, Option, Answer, Session } = db;

export const getAllWorksheets = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ model: Option, as: "task_options" }],
    });

    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const checkWorksheetAnswer = async (req, res) => {
  try {
    const token = getBearerToken(req);

    if (!token) {
      return res.status(401).json({ error: "No Bearer token provided" });
    }

    const session = await Session.findOne({ where: { token } });
    if (!session) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { taskId } = req.params;
    const { optionId } = req.body || {};

    if (!optionId) {
      return res.status(400).json({ error: "No optionId provided" });
    }

    const option = await Option.findOne({
      where: { id: optionId, taskId },
    });

    if (!option) {
      return res
        .status(400)
        .json({ error: "Option does not belong to this task" });
    }

    const [answer, created] = await Answer.findOrCreate({
      where: { sessionId: session.id, taskId },
      defaults: { id: uuidv4(), optionId },
    });

    if (!created) {
      answer.optionId = optionId;
      await answer.save();
    }

    return res.json({ correct: option.isCorrect });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
