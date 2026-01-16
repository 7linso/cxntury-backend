import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../models/index.js";

const router = Router();
const { Session } = db;

router.get("/session", async (req, res) => {
  const token = uuidv4();

  // that wasn't required but if i have session, why don't i set expiration date
  const validTill = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const session = await Session.create({
    id: uuidv4(),
    token,
    validTill,
  });

  return res.json({ token: session.token });
});

export default router;
