import { v4 as uuidv4 } from "uuid";
import db from "../models/index.js";

const { Session } = db;

export const getOrCreateSession = async (req, res) => {
  try {
    const token = uuidv4();

    // that wasn't required but if i have session, why don't i set expiration date
    const validTill = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const session = await Session.create({
      id: uuidv4(),
      token,
      validTill,
    });

    return res.json({ token: session.token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
